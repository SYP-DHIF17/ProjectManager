-- Your SQL goes here
CREATE TABLE customers
(
    customer_id UUID PRIMARY KEY REFERENCES users (user_id), -- is_a
    company     VARCHAR(100) NOT NULL
);