-- Your SQL goes here
CREATE TABLE customers
(
    customer_id UUID PRIMARY KEY REFERENCES users (id) -- is_a
);