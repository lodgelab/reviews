DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE reviews WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 2 };

use reviews;

CREATE TABLE review (
  id int,
  property_id int,
  host_picture varchar,
  host_name varchar,
  guest_id int,
  guest_picture varchar,
  guest_name varchar,
  review text,
  review_response text,
  date date,
  accuracy smallint,
  communication smallint,
  cleanliness smallint,
  location smallint,
  check_in smallint,
  value smallint,
  PRIMARY KEY (property_id, id)
);
