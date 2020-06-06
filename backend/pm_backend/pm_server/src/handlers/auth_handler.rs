use actix_web::{web, HttpResponse};

use crate::utils::jwt_utils::create_token;
use crate::data::AuthUser;
use crate::data::request_data::LoginRequest;
use crate::data::response_data::TokenResponse;
use crate::utils::hashing_utils::verify;
use deadpool_postgres::{Client, Pool};
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use pm_database::models::user::User;

pub async fn login(
    auth_data: web::Json<LoginRequest>, //request body
    pool: web::Data<Pool>,              //data of web server
) -> Result<HttpResponse, APIError> {
    let client: Client = get_db_client(&pool).await?; // connection to db

    let user: User = query_one(
        &client,
        include_str!("../../../../sql/queries/retrieve_queries/get_user_for_id.sql"),
        &[&auth_data.email],
        APIError::Unauthorized,
    )
    .await?;

    let user_id = user.user_id.clone();
    //make sure the heavy work happens on the thread pool
    let response: TokenResponse = web::block(move || {
        if verify(&user.password[..], &auth_data.password)? {
            //First element --> token, second element --> Expiration Timestamp
            let token_tuple = create_token(AuthUser { user_id });

            return Ok(TokenResponse {
                token: token_tuple.0,
                expiration: token_tuple.1,
                user: user.into()
            });
        }
        Err(APIError::Unauthorized)
    })
    .await?;

    Ok(HttpResponse::Ok().json(response))
}
