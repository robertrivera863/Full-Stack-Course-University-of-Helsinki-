# Exercise 11.1 — CI/CD for non-JavaScript languages

## Linting, testing and building in Python

Python projects typically use a separate tool for each concern. Linting is
handled by tools such as **Ruff** or **Flake8**, which enforce the PEP 8 style
guide and catch common mistakes. Testing is dominated by **pytest**, a
framework whose fixtures and concise assertions make both unit and integration
tests pleasant to write. Building and packaging use **setuptools** or
**Poetry**, with project metadata declared in `pyproject.toml`; these produce
distributable wheels and a reproducible dependency lock file. Together,
`ruff check`, `pytest` and `poetry build` cover the same lint–test–build
responsibilities that ESLint, Jest and Vite cover in a JavaScript project.

## Alternatives to Jenkins and GitHub Actions

Beyond Jenkins and GitHub Actions, the most common options are **GitLab
CI/CD** (native, YAML-based, tightly integrated with merge requests),
**CircleCI** (configuration-as-code with strong parallelism), and **Bitbucket
Pipelines**. TeamCity and Travis CI are also still in use. All of them follow
the same core model: jobs are declared in YAML, executed on runners, and their
status is reported per commit or merge request.

## Self-hosted versus cloud-based

A self-hosted runner (or a self-hosted Jenkins server) gives full control over
the environment, can reuse existing on-premise hardware, and may become
cheaper at scale, but it requires maintaining, patching and scaling the build
infrastructure yourself. Cloud-hosted CI (GitHub-hosted runners, CircleCI,
GitLab.com) removes that burden and scales on demand, which suits the vast
majority of projects.

For this project, a cloud-based environment is the better choice: it is small,
does not need special hardware, and avoids the overhead of running a build
server. GitHub Actions is the natural fit because the source code already
lives on GitHub.
