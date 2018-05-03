#!/bin/bash
echo "window.appConfig = { API_URL: '${!API_URL}'} " >> config.js
nginx -g "daemon off;"