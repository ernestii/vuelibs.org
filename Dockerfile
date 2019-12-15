FROM node:12.13.1-alpine

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build

ENV PORT=8080
EXPOSE 8080

RUN chmod +x /app/entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh" ]
