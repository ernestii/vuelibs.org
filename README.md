# Build for production

### Prerequisites:
* nodejs
* forever
* yarn
* set up nginx proxy on port 3001

## Install:

```
git clone ...
cd vuelibs.org
yarn install
```

## Deploy Webapp

```
# Copy example.deploy.sh as deploy.sh and replace api keys and mongo url.
chmod +x deploy.sh
./deploy.sh
```


#### Parser

```
# Copy example.parser.sh as parser.sh and replace api keys and mongo url.
chmod +x parser.sh

# Dev
ENV=dev ./parser.sh

# Prod
ENV=prod ./parser.sh
```


## CRON

Run parser everyday at 5:23
```
EDITOR=nano crontab -e
23 5 * * * ENV=prod CD PATH_TO_REPO/ && ./parser.sh
```

# Tech stack
* node.js
* mongodb (I use mlab)
* vue.js
* babel
