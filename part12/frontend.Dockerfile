# Dockerfile for the bloglist frontend (part5/bloglist-frontend)
# Multi-stage build: compile with Node, serve with nginx.

# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.25-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
