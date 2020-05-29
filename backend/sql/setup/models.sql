CREATE TABLE users
(
    user_id uuid PRIMARY KEY,
    created_on date NOT NULL,
    left_on date,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL UNIQUE,
    password VARCHAR (100) NOT NULL,
    birthdate date NOT NULL,
    is_active boolean NOT NULL
);


CREATE TABLE teams
(
    team_id uuid PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE teammembers
(
    team_id uuid REFERENCES teams (team_id),
    user_id uuid REFERENCES users (user_id),
    PRIMARY KEY (team_id, employee_id)
);

CREATE TABLE projects
(
    project_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date date NOT NULL,
    planned_enddate date NOT NULL,
    real_enddate date NOT NULL,
    overall_budget NUMERIC NOT NULL,
    leader uuid REFERENCES users (user_id) NOT NULL,
    creator uuid REFERENCES users (user_id) NOT NULL
);

CREATE TABLE project_parts
(
    project_part_id uuid PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    project_id uuid REFERENCES projects (project_id) NOT NULL
);

CREATE TABLE teamtasks
(
    project_part_id uuid REFERENCES project_parts (project_part_id),
    team_id uuid REFERENCES teams (team_id),
    PRIMARY KEY (project_part_id, team_id)
);

CREATE TABLE milestones
(
    milestone_id UUID NOT NULL PRIMARY KEY,
    created_on TIMESTAMP NOT NULL,
    created_by UUID REFERENCES users (user_id),
    -- Can be null!

    amount INTEGER NOT NULL,
    reach_date TIMESTAMP NOT NULL,
    name VARCHAR(100) NOT NULL,
    project_part_id UUID REFERENCES project_parts (project_part_id) NOT NULL
);

CREATE TABLE workpackages
(
    workpackage_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date date NOT NULL,
    planned_enddate date NOT NULL,
    real_enddate date NOT NULL
);