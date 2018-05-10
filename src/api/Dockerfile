# Starting with a feature-rich base image for build
FROM node:8.11.1 as build-env
WORKDIR /src
COPY . .
RUN npm install

# Switching to a slim base image for production
FROM alpine:latest

# Adding node
RUN apk add --no-cache nodejs
WORKDIR /app

# Copy artifacts from build container to slimmer container image
COPY --from=build-env /src .

CMD node app.js