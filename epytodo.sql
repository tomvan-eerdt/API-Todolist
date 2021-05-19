CREATE DATABASE IF NOT EXISTS epytodo;

DROP TABLE IF EXISTS epytodo.user;
DROP TABLE IF EXISTS epytodo.todo;

CREATE TABLE epytodo.user
(
    id INT KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255)  NOT NULL UNIQUE,
    password VARCHAR(255)  NOT NULL,
    created_at DATETIME default CURRENT_TIMESTAMP,
    firstname VARCHAR(255)  NOT NULL,
    name VARCHAR(255)  NOT NULL
);

CREATE TABLE epytodo.todo
(
    id INT KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(255)  NOT NULL UNIQUE,
    description VARCHAR(255)  NOT NULL,
    created_at DATETIME default CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status VARCHAR(255)  default 'not started',
    user_id INT UNSIGNED NOT NULL
);