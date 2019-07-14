FROM node:8-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

CMD [ "node", "app.js" ]

EXPOSE 8080