use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use deadpool_postgres::Pool;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::query_none;
use pm_errors::APIError;
use std::include_str;
use pm_database::models::user::User;

pub async fn create_user(
    auth_data: web::Json<CreateUserRequest>,
    pool: web::Data<Pool>,
) -> Result<HttpResponse, APIError> 
{
    // wrapped in block since the password is hashed during conversion
    let user:User = web::block(|| {
        Ok(auth_data.into_inner().into())
    }).await?;

    let client = get_db_client(&pool).await?;
    let User{user_id, created_on, left_on, firstname, lastname, email, password, birthdate, is_active} = user;

    query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_user.sql"), &[&user_id, &created_on, &left_on, &firstname, &lastname, &email, &password ,&birthdate, &is_active]).await?;
    
    Ok(HttpResponse::Ok().finish())
}
