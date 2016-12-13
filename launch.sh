#!/bin/bash

API_KEY='APIKEYHERE' \
PORT='4040' \
pm2 start app.js --name eneco-otg-api
