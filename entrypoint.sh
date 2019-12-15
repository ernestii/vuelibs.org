#!/bin/sh

# set up cronjob
crontab /app/crontab
crond

# run the app
node /app/server/babelize.js