use actix_web::{web, HttpResponse};

use crate::data::request_data::*;
use crate::data::response_data::*;
use crate::data::AuthUser;
use deadpool_postgres::{Pool, Client};
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

    query_none(
        &client,
        include_str!("../../../../sql/queries/insert_queries/insert_team.sql"),
        &[&project_id, &auth_user.user_id, &create_data.name],
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
    change_data: web::Json<UpdateTeamRequest>,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let affected_team = affected_team.into_inner();

    authorize_team_leader(&affected_team, &auth_user.user_id, &client).await?;

    let change_data = change_data.into_inner();

    // Name present --> update it
    if let Some(name) = change_data.name {
        query_none(&client, "UPDATE teams SET name = $1 WHERE team_id = $2;", &[&name, &affected_team]).await?;
    }

    Ok(HttpResponse::Ok().finish())
}

pub async fn add_member_to_team(
    pool: web::Data<Pool>,
    auth_user: AuthUser,
    affected_team: web::Path<Uuid>,
    new_member: web::Json<AddTeamMemberRequest>,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let affected_team = affected_team.into_inner();

    authorize_team_leader(&affected_team, &auth_user.user_id, &client).await?;

    let new_member = new_member.into_inner();

    query_none(&client, "INSERT INTO teammembers (team_id, user_id) VALUES ($1, $2);", &[&affected_team, &new_member.user]).await?;


    Ok(HttpResponse::Ok().finish())
}

pub async fn add_project_part_to_team(
    pool: web::Data<Pool>,
    affected_items: web::Path<(Uuid, Uuid)>,
    auth_user: AuthUser,
) -> Result<HttpResponse, APIError> {
    let client = get_db_client(&pool).await?;
    let (affected_project_part, affected_team) = affected_items.into_inner();
    authorize_team_leader(&affected_team, &auth_user.user_id, &client).await?; // make sure current user leads the team
    query_none(&client, "INSERT INTO team_parts(project_part_id, team_id) VALUES ($1, $2);", &[&affected_project_part, &affected_team]).await?;
    Ok(HttpResponse::Ok().finish())
}

/// This function returns an error in case the current user doesn't lead the specified team
pub async fn authorize_team_leader(
    affected_team: &Uuid,
    affected_user: &Uuid,
    client: &Client
) -> Result<(), APIError>{
    let current_leader:Uuid = query_one_map(client, "SELECT leader_id FROM teams WHERE team_id = $1;", &[&affected_team], APIError::NotFound,
    |row| Ok(row.get("leader_id"))).await?;

    // make sure the current user actually leads the team
    if current_leader != *affected_user {
        return Err(APIError::Unauthorized);
    }
    Ok(())
}
