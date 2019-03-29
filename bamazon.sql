DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2)NOT NULL,
  department VARCHAR(45) NOT NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (name, price, department, quantity)
VALUES 
("Backpack", 30.50, "School Supplies", 1000000), 
("Shoes", 300.99, "Footwears", 10000),
("Batman T-shirt", 100.90, "Clothings", 100000),
("Jacket", 10.10, "Clothings", 1000000),
("Earphone", 50.60, "Electronics", 870000),
("Mugs", 20.16, "Home and Kitchen", 100980),
("Cups", 10.12, "Home and Kitchen", 1008000),
("iPhone 9", 999.99, "Electronics", 10),
("iPhone8XR", 800.10, "Electronics", 80),
("Batman fonko", 45.50, "Toys", 1000000);

