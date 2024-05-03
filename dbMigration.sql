CREATE DATABASE task1;

USE task1;


CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  first_name varchar(50) DEFAULT NULL,
  last_name varchar(50) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  password_ varchar(255) DEFAULT NULL,
  active tinyint(1) DEFAULT 1,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
);

CREATE TABLE employee_info (
  user_id int DEFAULT NULL,
  role_ varchar(50) DEFAULT NULL,
  join_date date DEFAULT NULL,
  relive_date date DEFAULT NULL,
  employee_id int NOT NULL,
  active tinyint(1) DEFAULT 1,
  PRIMARY KEY (employee_id),
  KEY user_id (user_id),
  CONSTRAINT employee_info_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id)
);


CREATE TABLE address (
  user_id int DEFAULT NULL,
  address varchar(250) DEFAULT NULL,
  active tinyint(1) DEFAULT 1,
  KEY user_id (user_id),
  CONSTRAINT address_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id)
);




CREATE TABLE transactions (
  employee_id int DEFAULT NULL,
  amount decimal(12,3) DEFAULT NULL,
  payment_date date DEFAULT NULL,
  active tinyint(1) DEFAULT 1,
  KEY fk_employee_id (employee_id),
  CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employee_info (employee_id)
);

CREATE TABLE report_log (
  id int NOT NULL,
  log varchar(250) DEFAULT NULL,
  status tinyint(1) DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE test1 (
  id int NOT NULL
);