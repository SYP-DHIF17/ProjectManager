-- Your SQL goes here
CREATE TABLE teamtasks
(
    project_part_id uuid REFERENCES project_parts (project_part_id),
    team_id         uuid REFERENCES teams (team_id),
    PRIMARY KEY (project_part_id, team_id)
)