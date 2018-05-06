FROM node:8.11.1 as build-env
WORKDIR /src
COPY . .
RUN npm install

FROM alpine:latest
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=build-env /src .

CMD node app.js