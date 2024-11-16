## Setup Postgres DB in a Docker Image

### Ensure that Docker Desktop is running. Then run `$ docker-compose up -d`

### Introspect existing database schema.

`$ deno --env -A --node-modules-dir npm:drizzle-kit pull`

### Create a migration

`$ deno -A npm:drizzle-kit generate`

### Provision and run a new Postgres Image with Docker

`$ docker compose up -d`
