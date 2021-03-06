#!/bin/sh

git fetch
git pull
npm install
npm run build

forever stop "org.vuelibs"

ENV=prod \
PORT=3001 \
LOGDNA_KEY=xxxxxxxxxx \
MONGODB_URL=mongodb://xxxxxxxxxx \
    forever start \
        --killSignal=SIGKILL\
        --uid "org.vuelibs"\
        -l org.vuelibs.log\
        -o org.vuelibs.log\
        -e org.vuelibs.log -a\
        server/babelize.js
