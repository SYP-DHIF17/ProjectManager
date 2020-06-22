use serde::{Deserialize, Serialize};
use tokio_pg_mapper_derive::PostgresMapper;
use uuid::Uuid;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "teams")]
pub struct Team {
    #[serde(rename = "teamID")]
    pub team_id: Uuid,
    pub name: String,
    #[serde(rename = "projectID")]
    pub project_id: Uuid,
    #[serde(rename = "leaderID")]
    pub leader_id: Uuid,
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone, PostgresMapper)]
#[pg_mapper(table = "teammembers")]
pub struct TeamMember {
    #[serde(rename = "teamID")]
    pub team_id: Uuid,

    #[serde(rename = "userID")]
    pub user_id: Uuid,
}
