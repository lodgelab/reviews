DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE reviews WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

use reviews;

CREATE TABLE property (
  id int PRIMARY KEY,
  host_picture varchar,
  host_name varchar
);

CREATE TABLE guest (
  id int PRIMARY KEY,
  guest_picture varchar,
  guest_name varchar
);

CREATE TABLE review (
  id int,
  property_id int,
  guest_id int,
  review text,
  review_response text,
  date date,
  accuracy smallint,
  communication smallint,
  cleanliness smallint,
  location smallint,
  check_in smallint,
  value smallint,
  PRIMARY KEY (id, property_id, guest_id)
);
