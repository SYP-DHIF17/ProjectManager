use actix_web::{web, HttpResponse};

use crate::auth::utils::create_token;
use crate::auth::AuthUser;
use crate::data::request_data::LoginRequest;
use crate::data::response_data::TokenResponse;
use crate::utils::hashing_utils::verify;
use deadpool_postgres::{Client, Pool};
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::query_one_map;
use pm_errors::APIError;
use std::include_str;
use uuid::Uuid;

pub async fn login<'a>(
    auth_data: web::Json<LoginRequest>, //request body
    pool: web::Data<Pool>,              //data of web server
) -> Result<HttpResponse, APIError> {
    let client: Client = get_db_client(pool).await?; // connection to db
    let data: (Uuid, String) = query_one_map(
        &client,
        include_str!("../../../../sql/queries/retrieve_queries/get_user_for_id.sql"),
        &[&auth_data.email],
        APIError::Unauthorized,
        |row| Ok((row.get::<_, Uuid>("id"), row.get::<_, String>("hash"))),
    )
    .await?;

    let (user_id, hash) = data;

    //make sure the heavy work happens on the thread pool
    let response: TokenResponse = web::block(move || {
        if verify(&hash[..], &auth_data.password)? {
            //First element --> token, second element --> Expiration Timestamp
            let token_tuple = create_token(AuthUser { user_id });

            return Ok(TokenResponse {
                token: token_tuple.0,
                expiration: token_tuple.1,
            });
        }
        Err(APIError::Unauthorized)
    })
    .await?;

    Ok(HttpResponse::Ok().finish())
}
