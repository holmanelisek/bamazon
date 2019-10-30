DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("dogs","pets",50,10);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("cats","pets",30,6);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("snakes","pets",40,2);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("shirts","clothing",10,4);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("pants","clothing",20,5);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("socks","clothing",2,15);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("lipstick","makeup",5,10);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("eyeliner","makeup",10,8);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("cookbook","books",15,7);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("storybook","books",8,13);


--update reference
-- Updates the row where the column name is peter --
--UPDATE people
--SET has_pet = true, pet_name = "Franklin", pet_age = 2
--WHERE name = "Peter";