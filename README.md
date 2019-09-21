# Reviews

> Project description

## Related Projects

  - https://github.com/lodgelab/images
  - https://github.com/lodgelab/reservations
  - https://github.com/lodgelab/reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [RESTful CRUD API](#restful-crud-api)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 12.8.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Seeding database

```sh
mysql -u root < ./schema.sql
npm run seeder
```

### Start webpack and run server

```sh
npm run build
npm run start
```

## RESTful CRUD API

### POST: Creates a new review for a property

URL /api/:property/review

Example: /api/10000/review

Success Response:
```
"Review has been posted"
```

---
### GET: Retreives all reviews for one property

URL: /api/:property/reviews

Example: /api/100000/reviews

Success Response:
```
[
  {
    "property_id": 100000,
    "id": 6002811,
    "accuracy": 1,
    "check_in": 2,
    "cleanliness": 3,
    "communication": 2,
    "date": "2018-10-04",
    "guest_id": 9632250,
    "guest_name": "Arlie",
    "guest_picture": "https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg",
    "host_name": "Nathaniel",
    "host_picture": "https://s3.amazonaws.com/uifaces/faces/twitter/newbrushes/128.jpg",
    "location": 5,
    "review": "Vel reiciendis quod.",
    "review_response": "null",
    "value": 5
  },
]
```

---
### PUT: Update user review

URL: /api/:property/:review

Example: /api/10000/95000000

Success Response:
```
"Review has been updated"
```

---
### DELETE: Remove user review

URL: /api/:property/:review

Example: /api/10000/95000000

Success Response:
```
"Review has been deleted"
```