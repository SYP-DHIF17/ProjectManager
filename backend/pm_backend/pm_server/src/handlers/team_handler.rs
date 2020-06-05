use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use crate::data::response_data::*;
use crate::data::AuthUser;
use deadpool_postgres::Pool;
use itertools::Itertools;
use pm_database::db_helper::get_db_client;
use pm_database::db_helper::*;
use pm_errors::APIError;
use std::collections::HashSet;
use std::include_str;
use uuid::Uuid;

pub async fn create_team(
    create_data: web::Json<CreateTeamRequest>,
    pool: web::Data<Pool>,
    auth_user: AuthUser,
    project_id: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let project_id = project_id.into_inner();
    let team_id = Uuid::new_v4();
    query_none(
        &client,
        include_str!("../../../../sql/queries/insert_queries/insert_team.sql"),
        &[&team_id, &project_id, &auth_user.user_id, &create_data.name],
    )
    .await?;

    Ok(HttpResponse::Ok().finish())
}

pub async fn get_teams_for_project(
    project_id: web::Path<Uuid>,
    pool: web::Data<Pool>,
    _auth_user: AuthUser,
) -> Result<HttpResponse, APIError> {
    let project_id: Uuid = project_id.into_inner();
    let client = get_db_client(&pool).await?;
    let data: Vec<TeamQueryResult> = query_multiple_map(
        &client,
        include_str!("../../../../sql/queries/retrieve_queries/get_team_for_id.sql"),
        &[&project_id],
        |row: &tokio_postgres::Row| {
            let team_query_result = TeamQueryResult {
                project_id: row.get("project_id"),
                leader_id: row.get("leader_id"),
                name: row.get("name"),
                user_id: row.get("user_id"),
                team_id: row.get("team_id"),
            };
            Ok(team_query_result)
        },
    )
    .await?;

    let items = &data
        .into_iter()
        .group_by(|item: &TeamQueryResult| item.team_id);

    let team_responses: Vec<TeamResponse> = items
        .into_iter()
        .map(|(_, team_query_result)| {
            let teams: Vec<TeamQueryResult> = team_query_result.collect();
            let first_team = teams[0].clone();
            let users: HashSet<Option<Uuid>> = teams.into_iter().map(|item| item.user_id).collect();
            TeamResponse::from_result(first_team, users)
        })
        .collect();

    Ok(HttpResponse::Ok().json(team_responses))
}

pub async fn update_team(
    pool: web::Data<Pool>,
    auth_user: AuthUser,
    affected_team: web::Path<Uuid>,
) -> Result<HttpResponse, APIError> {
    todo!()
}
