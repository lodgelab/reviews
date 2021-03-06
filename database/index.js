const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['54.193.55.120', '13.52.100.218', '54.67.52.8', '18.144.47.115', '54.193.27.252', '54.219.184.120'], localDataCenter: 'us-west', keyspace: 'reviews' });

const getReviews = (propertyId, cb) => {
  const query = 'SELECT * FROM review WHERE property_id = ?';
  client.execute(query, [propertyId], { prepare: true })
    .then((result) => cb(null, result.rows));
};

const postReview = (guestReview, propertyId, cb) => {
  const {
    id,
    hostPicture,
    hostName,
    guestId,
    guestPicture,
    guestName,
    review,
    date,
    accuracy,
    communication,
    cleanliness,
    location,
    checkIn,
    value,
  } = guestReview;
  const query = 'INSERT INTO review (id, property_id, host_picture, ho`st_name, guest_id, guest_picture, guest_name, review, review_response, date, accuracy, communication, cleanliness, location, check_in, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  client.execute(query, [id, propertyId, hostPicture, hostName, guestId, guestPicture, guestName, review, null, date, accuracy, communication, cleanliness, location, checkIn, value], { prepare: true })
    .then((result) => cb(null, result.rows));
};

const putReview = (updateReview, propertyId, reviewId, cb) => {
  let query = ['UPDATE review', 'SET'];
  const set = [];
  const values = [];
  Object.keys(updateReview).forEach((column) => {
    set.push(`${column} = ?`);
  });
  Object.values(updateReview).forEach((value) => {
    values.push(value);
  });
  query.push(set.join(', '));
  query.push(`WHERE id = ${reviewId} AND property_id = ${propertyId}`);
  query = query.join(' ');

  client.execute(query, values, { prepare: true })
    .then(() => cb(null));
};

const deleteReview = (propertyId, reviewId, cb) => {
  const query = 'DELETE FROM review WHERE id = ? AND property_id = ?';
  client.execute(query, [reviewId, propertyId], { prepare: true })
    .then(() => cb(null));
};

module.exports = {
  getReviews,
  postReview,
  putReview,
  deleteReview,
};
