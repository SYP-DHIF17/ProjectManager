-- Your SQL goes here
CREATE TABLE workpackages
(
    workpackage_id  UUID PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    start_date      date         NOT NULL,
    planned_enddate date         NOT NULL,
    real_enddate    date         NOT NULL
);