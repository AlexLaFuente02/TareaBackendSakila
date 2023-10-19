CREATE TABLE actor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    gender VARCHAR(10)
);

INSERT INTO actor (first_name, last_name, birth_date, gender)
VALUES ('John', 'Doe', '1990-01-15', 'Masculino');


CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  hashedPassword VARCHAR(255) NOT NULL
);

/*Insertar desde un request para hacer hash del password*/
