use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use crate::data::response_data::UserInfo;
use crate::data::AuthUser;
use deadpool_postgres::{Client, Pool};
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::utils::hashing_utils::*;
use pm_database::models::user::User;
use uuid::Uuid;

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
    let User{created_on, firstname, lastname, email, password, birthdate, ..} = user;

    query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_user.sql"), &[&created_on, &firstname, &lastname, &email, &password ,&birthdate]).await?;
    
    Ok(HttpResponse::Ok().finish())
}

pub async fn update_password(
    auth_data: web::Json<ChangeUserRequest>,
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

    let ChangeUserRequest {old_password, new_password, firstname, lastname, email} = auth_data.into_inner(); 
    let client: Client = get_db_client(&pool).await?; // connection to db

    // 1.
    let db_hash: String = query_one_map(
        &client,
        include_str!("../../../../sql/queries/retrieve_queries/get_user_hash_for_id.sql"),
        &[&auth_user.user_id],
        APIError::NotFound,
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

    // Update password
    if let Some(new_password) = new_password {
        // 3. create new hash
        let new_hash:String = web::block(move || {
            Ok(hash_password(&new_password))
        }).await??;

        // 4. update password
        query_none(&client, include_str!("../../../../sql/queries/update_queries/update_password.sql"), &[&new_hash, &auth_user.user_id]).await?;
    }

    // Update firstname
    if let Some(firstname) = firstname { // moves firstname
        query_none(&client, include_str!("../../../../sql/queries/update_queries/update_firstname.sql"), &[&firstname, &auth_user.user_id]).await?;
    }

    // Update lastname
    if let Some(lastname) = lastname {
        query_none(&client, include_str!("../../../../sql/queries/update_queries/update_lastname.sql"), &[&lastname, &auth_user.user_id]).await?;
    }

    // Update email
    if let Some(email) = email {
        query_none(&client, include_str!("../../../../sql/queries/update_queries/update_email.sql"), &[&email, &auth_user.user_id]).await?;
    }

    Ok(HttpResponse::Ok().finish())
}

pub async fn get_info(
    auth_user: AuthUser,
    pool: web::Data<Pool>,
) -> Result<HttpResponse, APIError>{
    let client: Client = get_db_client(&pool).await?; // connection to db
    let user: UserInfo = query_one(&client, include_str!("../../../../sql/queries/retrieve_queries/get_user_info_for_id.sql"), &[&auth_user.user_id], APIError::NotFound).await?;
    Ok(HttpResponse::Ok().json(user))
}

pub async fn get_info_for_user(
    _auth_user: AuthUser,
    pool: web::Data<Pool>,
    user: web::Path<Uuid>,
) -> Result<HttpResponse, APIError>{
    let user_id = user.into_inner();
    let client: Client = get_db_client(&pool).await?; // connection to db
    let user: UserInfo = query_one(&client, include_str!("../../../../sql/queries/retrieve_queries/get_user_info_for_id.sql"), &[&user_id], APIError::NotFound).await?;
    Ok(HttpResponse::Ok().json(user))
}
