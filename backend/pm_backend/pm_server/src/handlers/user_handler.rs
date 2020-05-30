use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use crate::data::AuthUser;
use deadpool_postgres::{Client, Pool};
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::utils::hashing_utils::*;
use pm_database::models::user::User;

pub async fn create_user(
    create_data: web::Json<CreateUserRequest>,
    pool: web::Data<Pool>,
) -> Result<HttpResponse, APIError> 
{
    // wrapped in block since the password is hashed during conversion
    let user:User = web::block(|| {
        Ok(create_data.into_inner().into())
    }).await?;

    let client = get_db_client(&pool).await?;
    let User{user_id, created_on, left_on, firstname, lastname, email, password, birthdate, is_active} = user;

    query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_user.sql"), &[&user_id, &created_on, &left_on, &firstname, &lastname, &email, &password ,&birthdate, &is_active]).await?;
    
    Ok(HttpResponse::Ok().finish())
}

pub async fn update_password(
    auth_data: web::Json<ChangePasswordRequest>,
    pool: web::Data<Pool>,
    auth_user: AuthUser, // the user whose password is to be altered
) -> Result<HttpResponse, APIError> 
{
    /*
       1. make sure that the user exists; get his password hash
       2. validate the password
       3. create new hash
       4. update password
     */

    let ChangePasswordRequest {old_password, new_password} = auth_data.into_inner(); 
    let client: Client = get_db_client(&pool).await?; // connection to db

    // 1.
    let db_hash: String = query_one_map(
        &client,
        include_str!("../../../../sql/queries/retrieve_queries/get_user_hash_for_id.sql"),
        &[&auth_user.user_id],
        APIError::Unauthorized,
        |row| Ok(row.get::<_, String>("hash")),
    )
    .await?;

    // --- 2. ---

    // Is password correct?
    let res:bool = web::block(move || {
        Ok(verify(&db_hash[..], &old_password))
    }).await??;

    // Password was invalid --> Return with error
    if !res {
        return Err(APIError::Unauthorized);
    }

    // 3. create new hash
    let new_hash:String = web::block(move || {
        Ok(hash_password(&new_password))
    }).await??;

    // 4. update password
    query_none(&client, include_str!("../../../../sql/queries/update_queries/update_password.sql"), &[&new_hash, &auth_user.user_id]).await?;

    Ok(HttpResponse::Ok().finish())
}
