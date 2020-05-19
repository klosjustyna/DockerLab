FROM node:alpine

WORKDIR /opt/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "start"]
