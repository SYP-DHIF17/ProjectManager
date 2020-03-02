-- Your SQL goes here
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