use uuid::Uuid;
use tokio_pg_mapper::{Error, FromTokioPostgresRow};
use serde::{Deserialize, Serialize};
use tokio_postgres::row::Row as TokioRow;

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct QueryProjectPart {
    pub project_part_id: Uuid,
    pub name: String,
    pub position: i32,
}

impl FromTokioPostgresRow for QueryProjectPart {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            project_part_id: row.get("project_part_id"),
            name: row.get("name"),
            position: row.get("position"),
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("milestone_response")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct QueryMileStone {
    #[serde(rename = "milestoneID")]
    pub milestone_id: Uuid,
    pub name: String,
    pub description: String,
    #[serde(rename = "projectPartID")]
    pub project_part_id: Uuid,
    #[serde(rename = "reachDate")]
    pub reach_date: chrono::NaiveDate,
    selected: bool,
}

impl FromTokioPostgresRow for QueryMileStone {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            milestone_id: row.get("milestone_id"),
            name: row.get("name"),
            description: row.get("description"),
            project_part_id: row.get("project_part_id"),
            reach_date: row.get("reach_date"),
            selected: false,
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("milestone_response")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}

#[derive(PartialEq, Debug, Serialize, Deserialize, Clone)]
pub struct QueryWorkpackage {
    #[serde(rename = "workpackageID")]
    pub workpackage_id: Uuid,
    pub name: String,
    pub description: String,
    #[serde(rename = "startDate")]
    pub start_date: chrono::NaiveDate,
    #[serde(rename = "plannedEndDate")]
    pub planned_enddate: chrono::NaiveDate,
    #[serde(rename = "realEndDate")]
    pub real_enddate: Option<chrono::NaiveDate>,
    selected: bool,
}

impl FromTokioPostgresRow for QueryWorkpackage {
    fn from_row(row: TokioRow) -> Result<Self, Error> {
        Self::from_row_ref(&row)
    }

    fn from_row_ref(row: &TokioRow) -> Result<Self, Error> {
        let val = Self {
            workpackage_id: row.get("workpackage_id"),
            name: row.get("name"),
            description: row.get("description"),
            start_date: row.get("start_date"),
            planned_enddate: row.get("planned_enddate"),
            real_enddate: row.get("real_enddate"),
            selected: false,
        };
        Ok(val)
    }

    fn sql_table() -> String {
        String::from("milestone_response")
    }

    fn sql_fields() -> String {
        String::new()
    }

    fn sql_table_fields() -> String {
        String::new()
    }
}