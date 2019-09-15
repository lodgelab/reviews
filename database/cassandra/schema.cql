DROP KEYSPACE IF EXISTS reviews

CREATE KEYSPACE reviews WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

use reviews

CREATE TABLE home (
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
  home_id INT NOT NULL,
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
  FOREIGN KEY (home_id) REFERENCES home (id),
  FOREIGN KEY (guest_id) REFERENCES guest (id)
);

// Compress from server
// change random number javascript
// string concat takes a while
// test how long to seed database in chunks