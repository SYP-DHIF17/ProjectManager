use crate::schema::{users, employees, customers};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use diesel::*;

#[derive(Identifiable, Queryable, PartialEq, Debug, Insertable, Serialize, Deserialize, Associations, Clone)]
#[table_name = "teams"]
#[primary_key(team_id)]
pub struct Team {
    #[serde(rename = "teamID")]
    pub team_id: Uuid,
    pub name: String
}



#[derive(Identifiable, Queryable, PartialEq, Debug, Insertable, Serialize, Deserialize, Associations, Clone)]
#[table_name = "teammembers"]
#[primary_key(team_id, employee_id)]
pub struct Teammember {
    #[serde(rename = "teamID")]
    pub team_id: Uuid, // ToDo REFERENCES teams (team_id),

    #[serde(rename = "employeeID")]
    pub employee_id: Uuid, // ToDo REFERENCES employees (employee_id),
}