FROM node:8.11.1 as build-env
COPY . /src
WORKDIR /src
RUN npm install

FROM alpine:latest
RUN apk add --no-cache nodejs
WORKDIR /src
COPY --from=build-env /src .

ENTRYPOINT ["node", "./app.js"]