use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use crate::data::response_data::*;
use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use uuid::Uuid;

pub async fn get_project_parts_for_team(
    pool: web::Data<Pool>,
    team_id: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let project_parts: Vec<ProjectPartResponse> = query_multiple(
        &client,
        include_str!("../../../../sql/queries/retrieve_queries/get_project_part_for_team_id.sql"),
        &[&team_id.into_inner()],
    )
    .await?;

    Ok(HttpResponse::Ok().json(project_parts))
}

pub async fn create_project_part(
    pool: web::Data<Pool>,
    new_part: web::Json<CreateProjectPartRequest>,
    _auth_user: AuthUser,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let new_part = new_part.into_inner();
    let id = query_one_map(
        &client,
        "INSERT INTO project_parts(name, position) VALUES($1, $2) RETURNING project_part_id;",
        &[&new_part.name, &new_part.position],
        APIError::PGError,
        |row| Ok(row.get("project_part_id")),
    )
    .await?;
    Ok(HttpResponse::Ok().json(ResponseID::new(id)))
}

pub async fn update_project_part(
    pool: web::Data<Pool>,
    _auth_user: AuthUser,
    affected_project_part: web::Path<Uuid>,
    change_data: web::Json<UpdateProjectPartRequest>,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let affected_project_part = affected_project_part.into_inner();

    let change_data = change_data.into_inner();

    // Name present --> update it
    if let Some(name) = change_data.name {
        query_none(
            &client,
            "UPDATE project_parts SET name = $1 WHERE project_part_id = $2",
            &[&name, &affected_project_part],
        )
        .await?;
    }

    if let Some(position) = change_data.position {
        query_none(
            &client,
            "UPDATE project_parts SET position = $1 WHERE project_part_id = $2",
            &[&position, &affected_project_part],
        )
        .await?;
    }

    Ok(HttpResponse::Ok().finish())
}
