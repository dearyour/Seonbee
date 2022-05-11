# base image
FROM node:16.13.1

# set working directory
WORKDIR /app

EXPOSE 5000

# permission
RUN chmod -R 777 /app

# app dependencies, install 및 caching
COPY package.json /app/package.json

RUN npm install

RUN export GOOGLE_APPLICATION_CREDENTIALS=seonbee-348514-6d6eb2bedcbf.json

COPY . ./

# 앱 실행
CMD ["npm", "start"]
