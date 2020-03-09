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


#[derive(Identifiable, Queryable, PartialEq, Debug, Insertable, Serialize, Deserialize, Associations, AsChangeset, Clone)]
#[table_name = "customers"]
#[primary_key(customer_id)]
pub struct Customer {
    #[serde(rename = "customerID")]
    pub customer_id: Uuid,
    pub company: String,
}

#[derive(Identifiable, Queryable, PartialEq, Debug, Insertable, Serialize, Deserialize, Associations, AsChangeset, Clone)]
#[table_name = "employees"]
#[primary_key(employee_id)]
pub struct Employee {
    #[serde(rename = "employeeID")]
    pub employee_id: Uuid,

}