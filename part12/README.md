# Part 12 — Containers

Containerization with Docker and Docker Compose.

## Exercises

| Exercises | What | Where |
|-----------|------|-------|
| 12.1 | `docker run hello-world` | [`script-answers/exercise12_1.txt`](script-answers/exercise12_1.txt) |
| 12.2 | Run an `ubuntu` container and create files | [`script-answers/exercise12_2.txt`](script-answers/exercise12_2.txt) |
| 12.3 | Restart a container and edit a file | [`script-answers/exercise12_3.txt`](script-answers/exercise12_3.txt) |
| 12.4 | Install Node inside a container and run "Hello World" | [`script-answers/exercise12_4.txt`](script-answers/exercise12_4.txt) |
| 12.5–12.7 | Dockerfiles + Docker Compose for the bloglist app | [`backend.Dockerfile`](backend.Dockerfile), [`frontend.Dockerfile`](frontend.Dockerfile), [`docker-compose.yml`](docker-compose.yml) |
| 12.8 | Query MongoDB inside its container | [`script-answers/exercise12_8.txt`](script-answers/exercise12_8.txt) |
| 12.9–12.10 | Docker Compose with MongoDB + Redis | [`docker-compose.yml`](docker-compose.yml) |
| 12.11 | Redis CLI operations | [`script-answers/exercise12_11.txt`](script-answers/exercise12_11.txt) |

## Notes

- The `script-answers/` files are terminal transcripts (recorded with the `script`
  command) of the Docker commands required by the script-based exercises.
- `backend.Dockerfile` and `frontend.Dockerfile` containerize the bloglist app
  from parts 4 and 5. To use them, copy each into its app directory as
  `Dockerfile` (or adjust the `dockerfile:` paths in `docker-compose.yml`).
- `docker-compose.yml` runs the backend, frontend and a MongoDB service together:

```bash
docker compose up --build
```
