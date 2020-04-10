use crate::schema::{users, employees, customers};
use serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct Team {
    #[serde(rename = "teamID")]
    pub team_id: Uuid,
    pub name: String
}



#[derive(Identifiable, Queryable, PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct Teammember {
    #[serde(rename = "teamID")]
    pub team_id: Uuid, // ToDo REFERENCES teams (team_id),

    #[serde(rename = "employeeID")]
    pub employee_id: Uuid, // ToDo REFERENCES employees (employee_id),
}
