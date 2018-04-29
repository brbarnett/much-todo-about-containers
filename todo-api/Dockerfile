FROM node:8.11.1 as build-env
ENV PORT 80
WORKDIR /src
COPY . .
RUN npm install

FROM alpine:latest
ENV PORT 80
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=build-env /src .

CMD node app.js