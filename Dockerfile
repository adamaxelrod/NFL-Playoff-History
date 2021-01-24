FROM node:15.6.0-alpine3.10
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .