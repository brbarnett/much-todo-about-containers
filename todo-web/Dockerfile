FROM node:8.11.1 as build-env
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build-env [/src/index.html, /src/dist/bundle.js, .]