FROM node:8.11.1 as build-env
WORKDIR /src
COPY . .
RUN npm install
RUN npm run release

FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build-env /src/index.html .
COPY --from=build-env /src/dist/bundle.js ./dist/bundle.js
COPY --from=build-env /src/node_modules/todomvc-common/base.css ./node_modules/todomvc-common/base.css
COPY --from=build-env /src/node_modules/todomvc-app-css/index.css ./node_modules/todomvc-app-css/index.css
COPY --from=build-env /src/node_modules/todomvc-common/base.js ./node_modules/todomvc-common/base.js