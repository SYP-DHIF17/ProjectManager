-- Your SQL goes here
CREATE TABLE teammembers
(
    team_id     uuid REFERENCES teams (team_id),
    employee_id uuid REFERENCES employees (employee_id),
    PRIMARY KEY (team_id, employee_id)
)