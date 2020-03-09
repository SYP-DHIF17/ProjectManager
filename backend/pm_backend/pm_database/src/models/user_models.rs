use crate::schema::users;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use diesel::*;

#[derive(Identifiable, Queryable, PartialEq, Debug, Insertable, Serialize, Deserialize, Associations, AsChangeset, Clone)]
#[table_name = "users"]
#[primary_key(user_id)]
pub struct User {
    #[serde(rename = "userID")]
    pub user_id: Uuid,
    #[serde(rename = "createdOn")]
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