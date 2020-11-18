FROM node:alpine

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN yarn && yarn build
WORKDIR /app

CMD ["yarn", "start"]