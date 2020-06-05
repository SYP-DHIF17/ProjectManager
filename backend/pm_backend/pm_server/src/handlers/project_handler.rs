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

pub async fn create_project(
    create_data: web::Json<CreateProjectRequest>,
    pool: web::Data<Pool>,
    auth_user: AuthUser,
) -> Result<HttpResponse, APIError> { 
    let AuthUser {user_id} = auth_user;
    let wrapper = CreateProjectWrapper(create_data.into_inner(), user_id);
    let project:Project = wrapper.into();

    let client = get_db_client(&pool).await?;
    query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_project.sql"), &[&project.project_id, &project.name, &project.start_date, &project.planned_enddate, &project.overall_budget, &project.leader]).await?;
    
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
