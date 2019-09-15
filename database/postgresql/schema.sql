DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\connect reviews;

CREATE TABLE property (
  id SERIAL PRIMARY KEY,
  host_picture VARCHAR(100) NOT NULL,
  host_name VARCHAR(50) NOT NULL
);

CREATE TABLE guest (
  id SERIAL PRIMARY KEY,
  guest_picture VARCHAR(100) NOT NULL,
  guest_name VARCHAR(50) NOT NULL
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  property_id INT NOT NULL,
  guest_id INT NOT NULL,
  review TEXT NOT NULL,
  review_response TEXT NOT NULL,
  date DATE,
  accuracy SMALLINT NOT NULL,
  communication SMALLINT NOT NULL,
  cleanliness SMALLINT NOT NULL,
  location SMALLINT NOT NULL,
  check_in SMALLINT NOT NULL,
  value SMALLINT NOT NULL,
  FOREIGN KEY (property_id) REFERENCES property (id),
  FOREIGN KEY (guest_id) REFERENCES guest (id)
);