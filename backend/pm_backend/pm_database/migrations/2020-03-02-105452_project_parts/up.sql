-- Your SQL goes here
CREATE TABLE project_parts
(
    project_part_id uuid PRIMARY KEY,
    name            VARCHAR(100)                          NOT NULL,
    project_id      uuid REFERENCES projects (project_id) NOT NULL
);