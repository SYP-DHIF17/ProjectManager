use actix_web::{web, HttpResponse};

use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::data::request_data::*;
use crate::data::response_data::*;
use uuid::Uuid;

pub async fn get_milestones(pool: web::Data<Pool>, project_part_id: web::Path<Uuid>)
-> Result<HttpResponse, APIError> {
    let project_part_id = project_part_id.into_inner();
    let client = get_db_client(&pool).await?;
    let all_milestones:Vec<ResponseMileStone> = query_multiple(&client, include_str!("../../../../sql/queries/retrieve_queries/get_milestones_for_pp.sql"), &[&project_part_id]).await?;
    Ok(HttpResponse::Ok().json(all_milestones))
}

pub async fn create_milestone(
    pool: web::Data<Pool>,
    _auth_user: AuthUser,
    data: web::Json<CreateMileStoneRequest>,
    project_part_id: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    let project_part_id = project_part_id.into_inner();
    let data = data.into_inner();
    let client = get_db_client(&pool).await?;
    
    // insert new milestone
    let id = query_one_map(&client, "INSERT INTO milestones(reach_date, name, description, project_part_id) VALUES($1, $2, $3, $4) RETURNING milestone_id;",
    &[&data.reach_date, &data.name, &data.description, &project_part_id],
    APIError::PGError,
    |row| Ok(row.get("milestone_id"))
    ).await?;

    Ok(HttpResponse::Ok().json(ResponseID::new(id)))
}

pub async fn update_milestone(pool: web::Data<Pool>, milestone_id: web::Path<Uuid>, _auth_user: AuthUser, data: web::Json<UpdateMilestoneRequest>)
-> Result<HttpResponse, APIError> {
    let milestone_id = milestone_id.into_inner();
    let data = data.into_inner();
    let client = get_db_client(&pool).await?;

    let UpdateMilestoneRequest {reach_date, name, description} = data;

    if let Some(reach_date) = reach_date {
        query_none(&client, "UPDATE milestones SET reach_date = $1 WHERE milestone_id = $2;", &[&reach_date, &milestone_id]).await?;
    }
    if let Some(name) = name {
        query_none(&client, "UPDATE milestones SET name = $1 WHERE milestone_id = $2;", &[&name, &milestone_id]).await?;
    }
    if let Some(description) = description {
        query_none(&client, "UPDATE milestones SET description = $1 WHERE milestone_id = $2;", &[&description, &milestone_id]).await?;
    }

    Ok(HttpResponse::Ok().finish())
}