# Dockerfile for the bloglist backend (part4/bloglist-backend)
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=3003
EXPOSE 3003

CMD ["node", "index.js"]
