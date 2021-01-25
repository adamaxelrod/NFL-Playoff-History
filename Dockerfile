FROM node:14.15.4
RUN mkdir -p /usr/app/nfl-playoffs
WORKDIR /usr/app/nfl-playoffs
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3006
CMD ["npm", "run", "start"]