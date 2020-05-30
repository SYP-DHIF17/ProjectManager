use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "users")]
pub struct User {
    #[serde(rename = "userID")]
    pub user_id: Uuid, #[serde(rename = "createdOn")]
    pub created_on: chrono::NaiveDateTime,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
    #[serde(rename = "isActive")]
    pub is_active: bool,
    pub birthdate: chrono::NaiveDate,
    #[serde(rename = "leftOn")]
    pub left_on: Option<chrono::NaiveDate>,
}
