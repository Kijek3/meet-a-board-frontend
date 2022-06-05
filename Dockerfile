### STAGE 1: Build ###
FROM node:16.15.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN apk add g++ make py3-pip
RUN npm ci
COPY . .
RUN npm run build && npm prune

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine AS run
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/meet-a-board-frontend /usr/share/nginx/html
