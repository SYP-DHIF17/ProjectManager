use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
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
