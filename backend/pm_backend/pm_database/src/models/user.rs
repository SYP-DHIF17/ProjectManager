use crate::schema::{users, employees, customers};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Identifiable, Queryable, PartialEq, Debug, Serialize, Deserialize, Clone)]
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


#[derive(Identifiable, Queryable, PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct Customer {
    #[serde(rename = "customerID")]
    pub user_id: Uuid,
    pub company: String,
}

#[derive(Identifiable, Queryable, PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct Employee {
    #[serde(rename = "employeeID")]
    pub user_id: Uuid,
}
