use actix_web::{web, HttpResponse};

use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::data::request_data::*;
use crate::data::response_data::*;
use uuid::Uuid;

pub async fn get_workpackages(pool: web::Data<Pool>, project_part_id: web::Path<Uuid>)
-> Result<HttpResponse, APIError> {
    let project_part_id = project_part_id.into_inner();
    let client = get_db_client(&pool).await?;
    let all_milestones:Vec<ResponseWorkpackage> = query_multiple(&client, include_str!("../../../../sql/queries/retrieve_queries/get_workpackages_for_pp.sql"), &[&project_part_id]).await?;
    Ok(HttpResponse::Ok().json(all_milestones))
}

pub async fn create_workpackage(
    pool: web::Data<Pool>,
    _auth_user: AuthUser,
    data: web::Json<CreateWorkpackageRequest>,
    project_part_id: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    let project_part_id = project_part_id.into_inner();
    let data = data.into_inner();
    let client = get_db_client(&pool).await?;

    // insert new milestone
    let id = query_one_map(&client, "INSERT INTO workpackages(name, start_date, planned_enddate, description, real_enddate, project_part_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING workpackage_id;",
    &[&data.name, &data.start_date, &data.planned_enddate, &data.description, &data.real_enddate, &project_part_id],
    APIError::PGError,
    |row| Ok(row.get("workpackage_id"))
    ).await?;

    Ok(HttpResponse::Ok().json(ResponseID::new(id)))
}

pub async fn update_workpackage(pool: web::Data<Pool>, milestone_id: web::Path<Uuid>, _auth_user: AuthUser, data: web::Json<UpdateWorkpackageRequest>)
-> Result<HttpResponse, APIError> {
    let milestone_id = milestone_id.into_inner();
    let data = data.into_inner();
    let client = get_db_client(&pool).await?;
    let project_part_id: Uuid = query_one_map(&client, "SELECT project_part_id FROM milestones WHERE milestone_id = $1;", &[&milestone_id], APIError::PGError, |row| Ok(row.get("project_part_id"))).await?;

    let UpdateWorkpackageRequest {name, start_date, planned_enddate, real_enddate_change, description} = data;


    if let Some(name) = name {
        query_none(&client, "UPDATE workpackages SET name = $1 WHERE project_part_id = $2;", &[&name, &project_part_id]).await?;
    }

    if let Some(planned_enddate) = planned_enddate {
        query_none(&client, "UPDATE workpackages SET planned_enddate = $1 WHERE project_part_id = $2;", &[&planned_enddate, &project_part_id]).await?;
    }

    if let Some(start_date) = start_date {
        query_none(&client, "UPDATE workpackages SET start_date = $1 WHERE project_part_id = $2;", &[&start_date, &project_part_id]).await?;
    }

    if let Some(description) = description {
        query_none(&client, "UPDATE workpackages SET description = $1 WHERE project_part_id = $2;", &[&description, &project_part_id]).await?;
    }

    let RealEndDateChange {change, date} = real_enddate_change;

    if change {
        query_none(&client, "UPDATE workpackages SET real_enddate = $1 WHERE project_part_id = $2;", &[&date, &project_part_id]).await?;
    }


    Ok(HttpResponse::Ok().finish())
}