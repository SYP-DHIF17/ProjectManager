use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

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
