CREATE TABLE users
(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_on date NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL UNIQUE,

    password VARCHAR (300) NOT NULL,
    birthdate date NOT NULL
);

CREATE TABLE projects
(
    project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) NOT NULL,
    start_date date NOT NULL,
    planned_enddate date NOT NULL,
    real_enddate date, -- Can be null since it's not known beforehand
    overall_budget int NOT NULL,
    leader uuid REFERENCES users (user_id) NOT NULL
);

CREATE TABLE teams
(
    team_id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),

    project_id uuid REFERENCES projects (project_id) NOT NULL,
    leader_id uuid REFERENCES users (user_id) NOT NULL,

    name VARCHAR(100) NOT NULL
);

CREATE TABLE teammembers
(
    team_id uuid REFERENCES teams (team_id),
    user_id uuid REFERENCES users (user_id),
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE project_parts
(
    project_part_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
	position INTEGER NOT NULL
);

CREATE TABLE team_parts -- Links project parts and teams
(
    project_part_id uuid REFERENCES project_parts (project_part_id),
    team_id uuid REFERENCES teams (team_id),
    PRIMARY KEY (project_part_id, team_id)
);

CREATE TABLE milestones
(
    milestone_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    reach_date DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,

    project_part_id UUID REFERENCES project_parts (project_part_id) NOT NULL
);

CREATE TABLE workpackages
(
    workpackage_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100) NOT NULL,
    start_date date NOT NULL,
    planned_enddate date NOT NULL,
    description VARCHAR(300) NOT NULL,
    real_enddate date,

    project_part_id UUID REFERENCES project_parts (project_part_id) NOT NULL
);
