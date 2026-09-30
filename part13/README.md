# Part 13 — Relational Databases

Rebuilding the bloglist backend with PostgreSQL and Sequelize, plus psql
command-line exercises.

## Exercises

| Exercises | What | Where |
|-----------|------|-------|
| 13.1–13.7 | psql / SQL queries (table creation, CRUD, joins, aggregation) | [`commands.sql`](commands.sql) |
| 13.8–13.16 | Express + Sequelize backend (Blog/User models, blogs & users routes, login) | [`backend/`](backend/) |
| 13.17+ | Migrations, sessions, reading lists (Sequelize migrations) | [`backend/`](backend/) |

## Stack

- PostgreSQL (via Docker) — see [`docker-compose.yml`](docker-compose.yml)
- Sequelize (ORM) + `pg` driver
- Express, `jsonwebtoken`, `bcrypt`

## Run

```bash
# 1. start PostgreSQL
docker compose up -d

# 2. start the backend
cd backend
npm install
npm run dev          # http://localhost:3001
```

The psql exercises are in [`commands.sql`](commands.sql); run them against the
database with `psql -U postgres -d bloglist`.
