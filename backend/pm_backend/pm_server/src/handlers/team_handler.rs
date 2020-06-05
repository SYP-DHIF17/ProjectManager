use actix_web::{web, HttpResponse};

use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::data::response_data::ProjectResponse;
use crate::data::request_data::*;
use pm_database::models::project::Project;
use uuid::Uuid;

pub async fn create_team(
    create_data: web::Json<CreateTeamRequest>,
    pool: web::Data<Pool>,
    auth_user: AuthUser,
    project_id: web::Path<Uuid>
) -> Result<HttpResponse, APIError> { 
    let project_id = project_id.into_inner();
    
    Ok(HttpResponse::Ok().finish())
}
