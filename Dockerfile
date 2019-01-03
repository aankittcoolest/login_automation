FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ADD . .

# EXPOSE 8080

CMD [ "node", "index.js" ]