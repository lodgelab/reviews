const express = require('express');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const port = 3210;

app.use(compression());
app.use(cors());
app.use('/listings/:listings_id', express.static(`${__dirname}/../client/dist`));
// app.use(expressStaticGzip(`${__dirname}/../client/dist`, {
//   enableBrotli: true,
//   orderPreference: ['br', 'gz'],
//   setHeaders (res, path) {
//     res.setHeader("Cache-Control", "public, max-age=31536000");
//   },
// }));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/listings/:listing_id/reviews', (req, res) => {
  const listingID = req.params.listing_id;
  db.getListingReviews(listingID, (error, data) => {
    if (error) {
      console.log('SERVER GET LISTING REVIEWS ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER GET LISTING REVIEWS SUCCESS');
      res.status(200).send(data);
    }
  });
});

app.get('/api/listings/:listing_id/host', (req, res) => {
  const listingID = req.params.listing_id;
  db.getListingHost(listingID, (error, data) => {
    if (error) {
      console.log('SERVER GET LISTING HOST ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER GET LISTING HOST SUCCESS');
      res.status(200).send(data);
    }
  });
});

app.get('/api/listings/users/:user_id', (req, res) => {
  const userID = req.params.user_id;
  db.getReviewUser(userID, (error, data) => {
    if (error) {
      console.log('SERVER GET REVIEW USER ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER GET REVIEW USER SUCCESS');
      res.status(200).send(data);
    }
  });
});

app.get('/api/listings/review/response/:response_id', (req, res) => {
  const responseID = req.params.response_id;
  db.getReviewResponse(responseID, (error, data) => {
    if (error) {
      console.log('SERVER GET REVIEW RESPONSE ERROR: ', error);
      res.status(500).send(error);
    } else {
      console.log('SERVER GET REVIEW RESPONSE SUCCESS');
      res.status(200).send(data);
    }
  });
});

/*
Extend the existing API to support all CRUD operations. This should be done with the inherited DBMS:
  Create / POST - create a new item
  Read / GET - read an item
  Update / PUT - update an item
  Delete / DELETE - delete an item
  Be sure to select the appropriate routes for each of these actions so they conform to the REST standard.
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
