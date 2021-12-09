FROM node:16

RUN mkdir -p app
WORKDIR /app

COPY package*.json ./

RUN npm install --global nodemon
RUN npm install --global pm2

RUN npm install

COPY . ./app