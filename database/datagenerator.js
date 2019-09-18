const fs = require('fs');
const faker = require('faker');

console.log('ETA 7 mins');

const writeProperty = fs.createWriteStream('./database/csvdata/property.csv');
writeProperty.write('host_picture,host_name\n', 'utf8');

function generatePropertyCsv(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const hostPicture = faker.image.avatar();
      const hostName = faker.name.firstName();
      const data = `${id},${hostPicture},${hostName}\n`;
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

generatePropertyCsv(writeProperty, 'utf-8', () => {
  writeProperty.end();
  console.log('property.csv is done');
});

const writeGuest = fs.createWriteStream('./database/csvdata/guest.csv');
writeGuest.write('guest_picture,guest_name\n', 'utf8');

function generateGuestCsv(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const guestPicture = faker.image.avatar();
      const guestName = faker.name.firstName();
      const data = `${id},${guestPicture},${guestName}\n`;
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

generateGuestCsv(writeGuest, 'utf-8', () => {
  writeGuest.end();
  console.log('guest.csv is done');
});

const writeReview = fs.createWriteStream('./database/csvdata/review.csv');
writeReview.write('id,property_id,guest_id,review,review_response,date,accuracy,communication,cleanliness,location,check_in,value\n', 'utf8');

const randomNum = (num) => Math.ceil(Math.random() * num);

function generateReviewCsv(writer, encoding, callback) {
  let i = 100000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      if (id % 1000000 === 0) { console.log(id); }
      const propertyId = randomNum(10000000);
      const guestId = randomNum(10000000);
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
      const data = `${id},${propertyId},${guestId},${review},${reviewResponse},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\n`;
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
  console.log('review.csv is done');
});
