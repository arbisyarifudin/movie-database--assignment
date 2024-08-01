# MOVIE DATABASE Backend with Nest.js

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database

1. Run migration
```
npx mikro-orm migration:up
```

2. Run seeder
```
npx mikro-orm seeder:run --class DatabaseSeeder
```

## Environtment Variable
```
APP_DEBUG=true
APP_PORT=4000

JWT_SECRET=my_secret

DB_PATH='./src/database/db.sqlite'
DB_DEBUG=true
```
