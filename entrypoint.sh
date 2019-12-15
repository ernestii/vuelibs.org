#!/bin/sh

# set up cronjob
crontab /app/config/cronjobs
crond

tail -f /var/log/cron.log

# node /app/test.js
