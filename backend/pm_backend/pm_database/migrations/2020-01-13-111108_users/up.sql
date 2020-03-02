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