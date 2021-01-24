FROM node:14.15.4
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .