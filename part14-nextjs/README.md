# Part 14 — Next.js

A bloglist application rebuilt with **Next.js** (App Router).

## Exercises

| Exercises | What | Where |
|-----------|------|-------|
| 14.1–14.2 | Create the Next.js app, root layout and home page | [`app/layout.tsx`](app/layout.tsx), [`app/page.tsx`](app/page.tsx) |
| 14.3 | Navigation between pages | [`components/NavBar.tsx`](components/NavBar.tsx) |
| 14.4–14.5 | Blogs and users views (server-rendered pages) | [`app/blogs/page.tsx`](app/blogs/page.tsx), [`app/users/page.tsx`](app/users/page.tsx) |
| 14.6 | Login view | [`app/login/page.tsx`](app/login/page.tsx) |
| 14.7+ | Data fetching, database, authentication, Server Actions | (built on top of these pages in the full course) |

## Stack

- Next.js (App Router) + React + TypeScript
- Server Components by default, client components (`'use client'`) only where needed

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

The full course extends this with a PostgreSQL database (Drizzle ORM),
NextAuth authentication, Server Actions for mutations, and Playwright tests.
