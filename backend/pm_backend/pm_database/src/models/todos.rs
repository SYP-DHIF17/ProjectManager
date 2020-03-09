use crate::schema::{users, employees, customers};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use diesel::*;

#[derive(Identifiable, Queryable, PartialEq, Debug, Insertable, Serialize, Deserialize, Associations, Clone)]
#[table_name = "todos"]
#[primary_key(todo_id)]
pub struct Todo {
    #[serde(rename = "todoID")]
    pub todo_id: Uuid,

    #[serde(rename = "createdOn")]
    pub created_on: chrono::NaiveDateTime,

    pub title: String,
    pub description: String,
    
    #[serde(rename = "employeeID")]
    pub employee_id: Uuid // ToDo: REFERENCES employees (employee_id)
    
}