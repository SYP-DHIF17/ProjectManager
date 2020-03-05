-- Your SQL goes here
CREATE TABLE users
(
    user_id         UUID         NOT NULL PRIMARY KEY,
    created_on TIMESTAMP    NOT NULL,
    created_by UUID REFERENCES users (user_id), -- Can be null!

    firstname  VARCHAR(100) NOT NULL,
    lastname   VARCHAR(100) NOT NULL,

    email      VARCHAR(100) NOT NULL UNIQUE,
    password   VARCHAR(122) NOT NULL,      --hashed
    is_active  BOOLEAN      NOT NULL,

    birthdate DATE NOT NULL,

    left_on   DATE
);

-- Your SQL goes here
CREATE TABLE customers
(
    customer_id UUID PRIMARY KEY REFERENCES users (user_id), -- is_a
    company     VARCHAR(100) NOT NULL
);

CREATE TABLE employees
(
    employee_id UUID PRIMARY KEY REFERENCES users (user_id)
);

CREATE TABLE todos
(
    todo_id     UUID PRIMARY KEY,
    created_on  date                          NOT NULL,
    title       VARCHAR(100)                  NOT NULL,
    description VARCHAR(100)                  NOT NULL,
    employee_id UUID REFERENCES employees (employee_id) NOT NULL
);

CREATE TABLE teams
(
    team_id uuid PRIMARY KEY,
    name    VARCHAR(100) NOT NULL
);

CREATE TABLE teammembers
(
    team_id     uuid REFERENCES teams (team_id),
    employee_id uuid REFERENCES employees (employee_id),
    PRIMARY KEY (team_id, employee_id)
);

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
);

CREATE TABLE project_parts
(
    project_part_id uuid PRIMARY KEY,
    name            VARCHAR(100)                          NOT NULL,
    project_id      uuid REFERENCES projects (project_id) NOT NULL
);

CREATE TABLE teamtasks
(
    project_part_id uuid REFERENCES project_parts (project_part_id),
    team_id         uuid REFERENCES teams (team_id),
    PRIMARY KEY (project_part_id, team_id)
);

CREATE TABLE milestones
(
    milestone_id    UUID                                            NOT NULL PRIMARY KEY,
    created_on      TIMESTAMP                                       NOT NULL,
    created_by      UUID REFERENCES users (user_id), -- Can be null!

    number          INTEGER                                         NOT NULL,
    reach_date      TIMESTAMP                                       NOT NULL,
    name            VARCHAR(100)                                    NOT NULL,
    project_part_id UUID REFERENCES project_parts (project_part_id) NOT NULL
);

CREATE TABLE workpackages
(
    workpackage_id  UUID PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    start_date      date         NOT NULL,
    planned_enddate date         NOT NULL,
    real_enddate    date         NOT NULL
);

CREATE TABLE tickets
(
    ticket_id      uuid PRIMARY KEY,
    title          VARCHAR(100)   NOT NULL,
    description    VARCHAR(10000) NOT NULL,
    is_done        BOOLEAN        NOT NULL,
    importance     SMALLINT       NOT NULL,
    user_id        UUID REFERENCES users (user_id),
    workpackage_id UUID REFERENCES workpackages (workpackage_id)
)
