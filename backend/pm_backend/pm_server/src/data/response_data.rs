use pm_database::models::user::User;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

use tokio_pg_mapper::{Error, FromTokioPostgresRow};
use tokio_postgres::row::Row as TokioRow;
use super::query_data::*;

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
    #[serde(rename = "firstname")]
    pub first_name: String,
    #[serde(rename = "lastname")]
    pub last_name: String,
    pub email: String,
    pub birthdate: chrono::NaiveDate,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ProjectResponse {
    #[serde(rename = "projectID")]
    pub project_id: Uuid,
    #[serde(rename = "name")]
    pub project_name: String,
    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDate,
    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDate,
    #[serde(rename = "realEndDate")]
    pub real_enddate: Option<chrono::NaiveDate>,
    #[serde(rename = "overallBudget")]
    pub overall_budget: i32,
    #[serde(rename = "leaderID")]
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
    #[serde(rename = "projectID")]
    pub project_id: Uuid,
    #[serde(rename = "leaderID")]
    pub leader_id: Uuid,
    pub name: String,
    pub members: HashSet<Option<Uuid>>,
    #[serde(rename = "teamID")]
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
    pub position: i32,
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

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ResponseMileStone {
    #[serde(rename = "milestoneID")]
    pub milestone_id: Uuid,

    #[serde(rename = "reachDate")]
    pub reach_date: chrono::NaiveDate,

    pub name: String,

    pub description: String,
}

impl FromTokioPostgresRow for ResponseMileStone {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            milestone_id: row.get("milestone_id"),
            reach_date: row.get("reach_date"),
            name: row.get("name"),
            description: row.get("description"),
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("milestone_response")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ResponseWorkpackage {
    #[serde(rename = "workpackageID")]
    pub workpackage_id: Uuid,

    pub name: String,

    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDate,

    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDate,

    #[serde(rename = "realEndDate")]
    pub real_enddate: Option<chrono::NaiveDate>,

    pub description: String,
}

impl FromTokioPostgresRow for ResponseWorkpackage {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            workpackage_id: row.get("workpackage_id"),
            name: row.get("name"),
            start_date: row.get("start_date"),
            planned_enddate: row.get("planned_enddate"),
            real_enddate: row.get("real_enddate"),
            description: row.get("description"),
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("milestone_response")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ResponseID {
    id: Uuid,
}

impl ResponseID {
    pub fn new(id: Uuid) -> Self {
        Self {id}
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct ResponseProjectPart {
    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
    pub name: String,
    pub position: i32,
    milestones: Vec<QueryMileStone>,
    workpackages: Vec<QueryWorkpackage>,
}

impl ResponseProjectPart {
    pub fn from_parts(part: QueryProjectPart, workpackages: Vec<QueryWorkpackage>, milestones: Vec<QueryMileStone>) -> Self {
        let QueryProjectPart {project_part_id, name, position} = part;
        Self {
            project_part_id,
            name,
            position,
            workpackages,
            milestones
        }
    }
}