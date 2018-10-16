CREATE DATABASE movie_list;

USE movie_list;

CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  title VARCHAR(75) NOT NULL,
  WATCHED SMALLINT(1),
  movieID INT,
  releaseYear INT,
  runtime INT,
  overview VARCHAR(300),
  rating VARCHAR(5),
  imagePath VARCHAR(100),
  PRIMARY KEY (ID)
);