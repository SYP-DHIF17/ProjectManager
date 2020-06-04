use actix_web::{web, HttpResponse};

use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::data::response_data::ProjectResponse;

pub async fn create_project(
    // create_data: web::Json<CreateUserRequest>,
    // pool: web::Data<Pool>,
) -> Result<HttpResponse, APIError> 
{
    // wrapped in block since the password is hashed during conversion
    // let user:User = web::block(|| {
    //     Ok(create_data.into_inner().into())
    // }).await?;

    // let client = get_db_client(&pool).await?;
    // let User{user_id, created_on, left_on, firstname, lastname, email, password, birthdate, is_active} = user;

    // query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_user.sql"), &[&user_id, &created_on, &left_on, &firstname, &lastname, &email, &password ,&birthdate, &is_active]).await?;
    
    Ok(HttpResponse::Ok().finish())
}

pub async fn get_projects(
    pool: web::Data<Pool>,
    current_user: AuthUser,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let project:Vec<ProjectResponse> = query_multiple(&client, include_str!("../../../../sql/queries/retrieve_queries/get_project_for_id.sql"), &[&current_user.user_id]).await?;
    Ok(HttpResponse::Ok().json(project))
}
