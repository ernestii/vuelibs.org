FROM node:12.13.1-alpine

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT [ "node", "/app/server/babelize.js" ]
