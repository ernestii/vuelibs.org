#!/bin/sh

ENV=prod \
LOGDNA_KEY=XXXX \
MONGODB_URL=XXXX \
OCTOKIT_KEY=XXXX \
./node_modules/.bin/babel-node ./server/parser.js
