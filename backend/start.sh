#!/bin/sh
npx mikro-orm migration:up
npx mikro-orm schema:update --run
npx mikro-orm seeder:run
exec "$@"
