-- Your SQL goes here
CREATE TABLE todo
(
    todo_id     UUID PRIMARY KEY,
    created_on  date                          NOT NULL,
    title       VARCHAR(100)                  NOT NULL,
    description VARCHAR(100)                  NOT NULL,
    employee_id UUID REFERENCES employee (id) NOT NULL
);