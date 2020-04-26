FROM node:alpine as mybuilder

WORKDIR /opt/app

COPY package.json .

RUN npm install

COPY . .

RUN yarn build

FROM nginx
COPY --from=mybuilder /opt/app/build /usr/share/nginx/html
