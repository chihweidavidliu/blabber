FROM node:alpine

WORKDIR /blabber-server

COPY package.json ./

RUN npm i 

COPY . . 

CMD ["npm", "run", "prod"]