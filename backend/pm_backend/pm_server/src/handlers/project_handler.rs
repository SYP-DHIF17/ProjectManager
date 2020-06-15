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

pub async fn create_project(
    create_data: web::Json<CreateProjectRequest>,
    pool: web::Data<Pool>,
    auth_user: AuthUser,
) -> Result<HttpResponse, APIError> {
    let wrapper = CreateProjectWrapper(create_data.into_inner(), auth_user.into()); // the second into converts the auth_user into the underlying uuid
    let project:Project = wrapper.into();

    let client = get_db_client(&pool).await?;
    query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_project.sql"), &[&project.name, &project.start_date, &project.planned_enddate, &project.overall_budget, &project.leader]).await?;
    
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

pub async fn update_project (
    pool: web::Data<Pool>,
    current_user: AuthUser,
    update_project_data: web::Json<ChangeProjectRequest>,
    project_id: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    let project_id = project_id.into_inner();
    let client = get_db_client(&pool).await?;
    let leader:Uuid = query_one_map(&client, "SELECT leader FROM projects WHERE project_id = $1;", &[&project_id], APIError::NotFound, |row| Ok(row.get("leader"))).await?;

    // make sure the current user leads the project
    if leader != current_user.user_id {
        return Err(APIError::Unauthorized);
    }

    let ChangeProjectRequest {name, planned_enddate, real_enddate_change, overall_budget} = update_project_data.into_inner();

    if let Some(name) = name {
        query_none(&client, "UPDATE projects SET name = $1 WHERE project_id = $2;", &[&name, &project_id]).await?;
    }
    if let Some(planned_enddate) = planned_enddate {
        query_none(&client, "UPDATE projects SET planned_enddate = $1 WHERE project_id = $2;", &[&planned_enddate, &project_id]).await?;
    }
    if let Some(overall_budget) = overall_budget {
        query_none(&client, "UPDATE projects SET overall_budget = $1 WHERE project_id = $2;", &[&overall_budget, &project_id]).await?;
    }

    let RealEndDateChange {change, date} = real_enddate_change;

    if change {
        query_none(&client, "UPDATE projects SET real_enddate = $1 WHERE project_id = $2;", &[&date, &project_id]).await?;
    }

    Ok(HttpResponse::Ok().finish())
}
