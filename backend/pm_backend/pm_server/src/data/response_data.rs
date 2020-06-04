use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

use tokio_pg_mapper::{Error, FromTokioPostgresRow};
use tokio_postgres::row::Row as TokioRow;

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenResponse {
    pub token: String,
    pub expiration: String,
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
