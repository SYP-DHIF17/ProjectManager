-- Your SQL goes here
CREATE TABLE projects
(
    project_id      UUID PRIMARY KEY,
    name            VARCHAR(100)                            NOT NULL,
    start_date      date                                    NOT NULL,
    planned_enddate date                                    NOT NULL,
    real_enddate    date                                    NOT NULL,
    overall_budget  NUMERIC                                 NOT NULL,
    leader          uuid REFERENCES employees (employee_id) NOT NULL,
    creator         uuid REFERENCES employees (employee_id) NOT NULL
)