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

### POST: Creates a new review

POST /api/listings/:listing_id/review

Success Response:
```
[
  {
    "id": 1,
    "listings_id": 75,
    "user_id": 15,
    "date": "September 2019",
    "comment": "Ipsum quo eveniet. Sunt voluptatibus magnam vero et. Laudantium est voluptatem nulla delectus quo. Perspiciatis necessitatibus minima vero quia aut voluptates excepturi similique."
  }
]
```

---
### GET: Retrieves reviews for listing

GET /api/listings/:listing_id/host

Success Response:
```
[
  {
    "id": 1,
    "listings_id": 60,
    "user_id": 88,
    "date": "March 2019",
    "comment": "Odit numquam ut veritatis itaque quae expedita pariatur molestias. Corporis ex ab minus veritatis et sed explicabo voluptatum ut. Quis cum explicabo dolores eum omnis aut non. Aut magni soluta qui ab omnis quis alias.",
    "accuracy": 3,
    "communication": 4,
    "cleanliness": 4.
    "location": 5,
    "checkin": 2,
    "value": 4,
    "response_id": null
  }
]
```

---
### GET: Retreives host images

GET /api/listings/:listing_id/host

Success Response:
```
[
  {
    "host_pic": "https://s3.amazonaws.com/uifaces/faces/twitter/antjanus/128.jpg",
    "host_name": "Zander"
  }
]
```

---
### GET: Retreives user reviews

URL: /api/listings/users/:user_id

Success Response:
```
[
  {
    "id": 1,
    "pic": "https://s3.amazonaws.com/uifaces/faces/twitter/normanbox/128.jpg",
    "name": "Eleanora"
  }
]
```

---
### GET: Retreives review response

GET /api/listings/review/repsonse/:response_id

Success Response:
```
[
  {
    "id": 1,
    "comment": "Quasi aut ut perspiciatis sed. Consequatur qui aut est est consequatur. Ratione sunt accusamus quidem veniam quasi dolores suscipit."
  }
]
```

---
### DELETE: Remove review

DELETE /api/listings/:listing_id/review

Success Response:
```
"Review has been removed"
```