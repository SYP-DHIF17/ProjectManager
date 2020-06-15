use pm_database::models::user::User;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

use tokio_pg_mapper::{Error, FromTokioPostgresRow};
use tokio_postgres::row::Row as TokioRow;

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenResponse {
    pub token: String,
    pub expiration: String,
    pub user: ResponseUser,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "users")]
pub struct UserInfo {
    #[serde(rename = "userID")]
    pub user_id: Uuid,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub birthdate: chrono::NaiveDate,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ProjectResponse {
    pub project_id: Uuid,
    pub project_name: String,
    pub start_date: chrono::NaiveDate,
    pub planned_enddate: chrono::NaiveDate,
    pub real_enddate: Option<chrono::NaiveDate>,
    pub overall_budget: i32,
    pub leader_id: Uuid,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
}

impl FromTokioPostgresRow for ProjectResponse {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            project_id: row.get("project_id"),
            project_name: row.get("project_name"),
            start_date: row.get("start_date"),
            planned_enddate: row.get("planned_enddate"),
            real_enddate: row.get("real_enddate"),
            overall_budget: row.get("overall_budget"),
            leader_id: row.get("leader_id"),
            firstname: row.get("first_name"),
            lastname: row.get("last_name"),
            email: row.get("email"),
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("parsed_project")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct TeamQueryResult {
    pub project_id: Uuid,
    pub leader_id: Uuid,
    pub name: String,
    pub user_id: Option<Uuid>,
    pub team_id: Uuid,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct TeamResponse {
    pub project_id: Uuid,
    pub leader_id: Uuid,
    pub name: String,
    pub members: HashSet<Option<Uuid>>,
    pub team_id: Uuid,
}

impl TeamResponse {
    pub fn from_result(res: TeamQueryResult, members: HashSet<Option<Uuid>>) -> Self {
        let TeamQueryResult {
            project_id,
            leader_id,
            name,
            team_id,
            ..
        } = res;
        Self {
            members,
            project_id,
            leader_id,
            name,
            team_id,
        }
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ResponseUser {
    #[serde(rename = "userID")]
    pub user_id: Uuid,
    #[serde(rename = "createdOn")]
    pub created_on: chrono::NaiveDate,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub birthdate: chrono::NaiveDate,
}

impl From<User> for ResponseUser {
    fn from(user: User) -> Self {
        let User {
            user_id,
            created_on,
            firstname,
            lastname,
            email,
            birthdate,
            ..
        } = user;

        Self {
            user_id,
            created_on,
            firstname,
            lastname,
            email,
            birthdate,
        }
    }
}


#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ProjectPartResponse {
    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
    pub name: String,
    pub position: i32
}

impl FromTokioPostgresRow for ProjectPartResponse {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            project_part_id: row.get("project_part_id"),
            name: row.get("name"),
            position: row.get("position"),
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("project_part_response")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}