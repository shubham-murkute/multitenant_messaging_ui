FROM node:latest

WORKDIR /usr/src/session-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]