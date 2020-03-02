-- Your SQL goes here
CREATE TABLE employee
(
    employee_id UUID PRIMARY KEY REFERENCES users (user_id)
)