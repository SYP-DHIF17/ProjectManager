-- Your SQL goes here
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