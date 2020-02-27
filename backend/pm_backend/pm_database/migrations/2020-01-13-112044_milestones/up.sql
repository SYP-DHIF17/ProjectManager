-- Your SQL goes here
CREATE TABLE milestones
(
    id         UUID         NOT NULL PRIMARY KEY,
    created_on TIMESTAMP    NOT NULL,
    created_by UUID REFERENCES users (id), -- Can be null!

    number     INTEGER      NOT NULL,
    reach_date TIMESTAMP    NOT NULL,
    name       VARCHAR(100) NOT NULL
);