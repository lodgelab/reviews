const fs = require('fs');
const faker = require('faker');

console.log('ETA 1 min');

const writeReview = fs.createWriteStream('./database/csvdata/reviews.csv');
writeReview.write('id,property_id,host_picture,host_name,guest_id,guest_picture,guest_name,review,review_response,date,accuracy,communication,cleanliness,location,check_in,value\n', 'utf8');

const randomNum = (num) => Math.ceil(Math.random() * num);

function generateReviewCsv(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      if (id % 1000000 === 0) { console.log(id); }
      const propertyId = randomNum(1000000);
      const hostPicture = faker.image.avatar();
      const hostName = faker.name.firstName();
      const guestId = randomNum(1000000);
      const guestPicture = faker.image.avatar();
      const guestName = faker.name.firstName();
      const review = faker.lorem.sentence();
      let reviewResponse = null;
      const randomResponse = randomNum(100);
      if (randomResponse <= 15) { reviewResponse = faker.lorem.sentence(); }
      const fullDate = faker.date.past();
      const date = `${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDay() + 1}`;
      const accuracy = randomNum(5);
      const communication = randomNum(5);
      const cleanliness = randomNum(5);
      const location = randomNum(5);
      const value = randomNum(5);
      const checkIn = randomNum(5);
      const data = `${id},${propertyId},${hostPicture},${hostName},${guestId},${guestPicture},${guestName},${review},${reviewResponse},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

generateReviewCsv(writeReview, 'utf-8', () => {
  writeReview.end();
  console.log('reviews.csv is done');
});
