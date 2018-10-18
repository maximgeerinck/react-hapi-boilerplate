# image built on official nodejs v6
FROM node:latest
MAINTAINER Maxim Geerinck <geerinck.maxim@gmail.com>

# Set working dir and copy contents of our images to that dir  
RUN mkdir -p /usr/app && cd /usr/app
RUN npm install -g nodemon pm2 typescript ava

# install dependencies
COPY *.json /usr/app/
WORKDIR /usr/app

# npm install will check NODE_ENV if its production if will not install dev dependencies
RUN npm install

# copy sources
COPY ./src ./src
COPY ./config ./config
COPY ./mails ./mails
COPY ./tests ./tests
# COPY ./public ./public

# COMPILE
RUN npm run compile

# create env file with the port
ENV PORT 5000
EXPOSE $PORT

CMD ["pm2-docker", "process.json"]