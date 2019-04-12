# Build for production

### Prerequisites:
* nodejs
* forever
* set up nginx proxy on port 3001

### Install & deploy:


```
git clone ...
# Copy example.deploy.sh as deploy.sh and replace api keys and mongo url.
cd vuelibs.org
./deploy.sh
```

## Run parser

Debug:
```
babel-node --inspect=1234 server/parser.js
```

Prod (will use logdna logger):
```
ENV=prod ./node_modules/.bin/babel-node server/parser.js 
```

## CRON

Run parser everyday at 5:23
```
EDITOR=nano crontab -e
23 5 * * * ENV=prod LOGDNA_KEY=NNNN MONGODB_URL=NNNN OCTOKIT_KEY=NNNN PATH_TO_REPO/node_modules/.bin/babel-node PATH_TO_REPO/server/parser.js
```

# Tech stack
* node.js
* mongodb (I use mlab)
* vue.js
* babel
