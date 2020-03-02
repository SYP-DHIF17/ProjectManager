-- Your SQL goes here
CREATE TABLE project_workpackages
(
    project_id     uuid REFERENCES projects (project_id),
    workpackage_id uuid REFERENCES workpackages (workpackage_id),
    PRIMARY KEY (project_id, workpackage_id)
)