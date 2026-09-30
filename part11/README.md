# Part 11 — CI/CD

Continuous integration and delivery for the Full Stack Open example project,
implemented with GitHub Actions.

## Exercises

| Exercises | What | File |
|-----------|------|------|
| 11.1 | Essay on CI/CD concepts | [`exercise1.md`](exercise1.md) |
| 11.2–11.9 | Lint / build / test / E2E pipeline | [`workflows/pipeline.yml`](workflows/pipeline.yml), [`workflows/hello.yml`](workflows/hello.yml) |
| 11.10–11.12 | Deploy to Fly.io + health check | [`workflows/deploy.yml`](workflows/deploy.yml) |
| 11.13–11.17 | PR triggers, branch protection, versioning | [`workflows/versioning.yml`](workflows/versioning.yml) |
| 11.18–11.19 | Discord notifications + periodic health check | [`workflows/health-check.yml`](workflows/health-check.yml) |
| 11.20–11.21 | Own pipeline (frontend + backend in one repo) | `workflows/pipeline.yml` |

## Notes

- In a real repository these workflow files live in `.github/workflows/` at the
  repository root (where GitHub Actions discovers them). They are kept here
  under `workflows/` as the submission copy.
- Deployment uses **Fly.io** (`FLY_API_TOKEN`) and notifications use a
  **Discord** webhook (`DISCORD_WEBHOOK`), both stored as repository secrets.
- Exercise 11.12 adds a `GET /health` endpoint to the app and configures it as
  the Fly.io HTTP health-check path; the periodic `workflows/health-check.yml`
  pings that endpoint.
- Exercises 11.15–11.16 bump a patch version and tag the release automatically
  (via `github-tag-action`), skipping commits whose message contains `#skip`.
- Exercise 11.17/11.21 are done in the GitHub UI: enabling branch protection on
  `main` (require PR + passing status checks) and using pull requests for merges.
