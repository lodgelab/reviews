const { Pool } = require('pg');
const faker = require('faker');

const pool = new Pool({
  user: 'alvinlo',
  host: 'localhost',
  database: 'reviews',
  password: '',
  port: 5432,
});

const seedProperty = () => {
  for (let i = 1; i <= 1000000; i++) {
    pool.query('INSERT INTO property (host_picture, host_name) VALUES ($1, $2)', [faker.image.avatar(), faker.name.firstName()], (err) => {
      if (err) { console.log(err); }
    });
  }
};

const seedGuest = () => {
  for (let i = 1; i <= 1000000; i++) {
    pool.query('INSERT INTO guest (host_picture, host_name) VALUES ($1, $2)', [faker.image.avatar(), faker.name.firstName()], (err) => {
      if (err) { console.log(err); }
    });
  }
};

seedProperty();
seedGuest();
