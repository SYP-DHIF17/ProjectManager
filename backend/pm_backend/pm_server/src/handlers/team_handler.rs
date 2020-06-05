use actix_web::{web, HttpResponse};

use crate::data::AuthUser;
use deadpool_postgres::Pool;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::include_str;
use crate::data::request_data::*;
use uuid::Uuid;

pub async fn create_team(
    create_data: web::Json<CreateTeamRequest>,
    pool: web::Data<Pool>,
    auth_user: AuthUser,
    project_id: web::Path<Uuid>
) -> Result<HttpResponse, APIError> { 
    let client = get_db_client(&pool).await?;
    let project_id = project_id.into_inner();
    let team_id = Uuid::new_v4();
    query_none(&client, include_str!("../../../../sql/queries/insert_queries/insert_team.sql"), &[&team_id, &project_id, &auth_user.user_id, &create_data.name]).await?;
    Ok(HttpResponse::Ok().finish())
}
