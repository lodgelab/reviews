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

URL /api/listings/:review_id

Example: /api/listings/1

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

URL: /api/listings/:review_id/

Example: /api/listings/1

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

URL: /api/listings/:host_id

Example: /api/listings/12

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

URL: /api/listings/guest_id

Example: /api/listings/1

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

URL: /api/listings/:review_id/:response_id

Example: /api/listings/12/1

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
### PUT: Update user review

URL: /api/listings/:review_id

Example: /api/listings/1

Success Response:
```
[
  {
    "id": 1,
    "listings_id": 75,
    "user_id": 15,
    "date": "September 2019",
    "comment": "Quasi aut ut perspiciatis. Sunt voluptatibus magnam vero et. Laudantium est voluptatem nulla delectus quo. Perspiciatis necessitatibus minima vero quia aut voluptates excepturi similique."
  }
]
```

---
### DELETE: Remove user review

URL: /api/listings/:review_id

Example: /api/listings/1

Success Response:
```
[
  {
    "id": 1
  }
]
```