
CREATE TABLE IF NOT EXISTS salesman(
    salesman_id INT NOT NULL AUTO_INCREMENT,
    salesman_name VARCHAR(10) NOT NULL,
    salesman_surname VARCHAR(10) NOT NULL,
    salesman_gender ENUM('M', 'F') NOT NULL,
    salesman_city VARCHAR(20) NOT NULL,
    salesman_commission DECIMAL(3, 2) NOT NULL,
    PRIMARY KEY(salesman_id)
);
CREATE TABLE IF NOT EXISTS customer(
    customer_id INT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(10) NOT NULL,
    customer_surname VARCHAR(10) NOT NULL,
    customer_city VARCHAR(20) NOT NULL,
    customer_grade INT NOT NULL,
    salesman_id INT,
    PRIMARY KEY(customer_id),
    FOREIGN KEY (salesman_id) REFERENCES salesman(salesman_id)
);

INSERT INTO salesman (salesman_id, salesman_name, salesman_surname, salesman_gender, salesman_city, salesman_commission)
VALUES (5001, "James", "Sibayi", "M", "Durbun", 0.15),
(5002, "Marie", "Khumalo", "F", "Johannesburg", 0.13),
(5003, "Dineo", "Sereti", "F", "Bloemfontein", 0.12);

INSERT INTO customer (customer_id, customer_name, customer_surname,
 customer_city, customer_grade, salesman_id)
 VALUES (3001, "Tshidi", "Lekota", "Bloemfontein",300 ,5003),
(3002, "Lawrence", "Gold", "Bloemfontein",100 ,5003),
(3003, "Ester", "Smith", "Cape Town",300 ,5003);


SELECT customer_name, customer_surname, customer_city
FROM customer WHERE salesman_id = 5003;


UPDATE customer SET customer_city = "Johannesburg" WHERE customer_name = "Dikeledi" AND customer_surname = "Thumi";

DELETE FROM customer WHERE customer_name = "Lawrence" AND customer_surname = "Gold";

DROP TABLE customer;

SELECT * FROM EXAM_RESULTS WHERE FIRST_NAME LIKE '%A' AND LAST_NAME LIKE '%A';


