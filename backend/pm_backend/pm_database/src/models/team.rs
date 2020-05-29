use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "teams")]
pub struct Team {
    #[serde(rename = "teamID")]
    pub team_id: Uuid,
    pub name: String
}



#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "teammembers")]
pub struct Teammember {
    #[serde(rename = "teamID")]
    pub team_id: Uuid, 

    #[serde(rename = "employeeID")]
    pub employee_id: Uuid,
}
