use actix_web::{web, HttpResponse};

use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::data::request_data::*;
use uuid::Uuid;

pub async fn get_milestones() -> Result<HttpResponse, APIError> {
    todo!()
}

pub async fn create_milestone(
    pool: web::Data<Pool>,
    auth_user: AuthUser,
    data: web::Json<CreateMileStoneRequest>,
    project_part_id: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    let project_part_id = project_part_id.into_inner();
    let data = data.into_inner();
    let client = get_db_client(&pool).await?;

    // make sure that the current user leads a team which is
    // involved in dealing with the specified project part
    let team_leaders:Vec<Uuid> = query_multiple_map(&client, include_str!("../../../../sql/queries/retrieve_queries/get_team_leaders_for_project_part.sql"), &[&project_part_id], |row| Ok(row.get("leader_id"))).await?;
    if !team_leaders.contains(&auth_user.user_id) {
        return Err(APIError::Unauthorized);
    }

    // insert new milestone
    query_none(&client, "INSERT INTO milestones(reach_date, name, description, project_part_id) VALUES($1, $2, $3, $4);",
    &[&data.reach_date, &data.name, &data.description, &project_part_id]).await?;

    Ok(HttpResponse::Ok().finish())
}
