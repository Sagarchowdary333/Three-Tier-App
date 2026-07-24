CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE IF NOT EXISTS employees (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    department VARCHAR(100) NOT NULL,

    salary DECIMAL(10,2) NOT NULL

);

INSERT INTO employees (name, department, salary)
VALUES
('Sagar Chowdary','DevOps',45000),
('Shaik Basha','SAP FICO',55000),
('Vasa Vamshi Krishna','AWS DevOps',100000),
('Gnani','AWS DevOps',45000);