require('newrelic');
const express = require('express');
const redis = require('redis');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const port = 3001;
const client = redis.createClient(6379, '54.67.14.231');

app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/listings/:property', express.static('public'));
app.use(morgan('dev'));

client.on('error', (err) => {
  console.log(err);
});

app.get('/api/listings/:property/reviews', (req, res) => {
  const { property } = req.params;
  client.get(property, (err, value) => {
    if (value) {
      res.send(JSON.parse(value));
    } else {
      db.getReviews(property, (error, review) => {
        if (error) { return error; }
        client.set(property, JSON.stringify(review));
        res.send(review);
      });
    }
  });
});

app.post('/api/listings/:property/review', (req, res) => {
  const { property } = req.params;
  db.postReview(req.body, property, (error) => {
    if (error) { return error; }
    res.send('Review has been posted');
  });
});

app.put('/api/listings/:property/:review', (req, res) => {
  const { property, review } = req.params;
  db.putReview(req.body, property, review, (error) => {
    if (error) { return error; }
    res.send('Review has been updated');
  });
});

app.delete('/api/listings/:property/:review', (req, res) => {
  const { property, review } = req.params;
  db.deleteReview(property, review, (error) => {
    if (error) { return review; }
    res.send('Review has been deleted');
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
