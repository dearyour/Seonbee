# base image
FROM node:16.13.1

# set working directory
WORKDIR /app

EXPOSE 3000

# permission
RUN chmod -R 777 /app

# `/app/node_modules/.bin`을 $PATH 에 추가
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies, install 및 caching
COPY package.json /app/package.json

RUN npm install --legacy-peer-deps
RUN npm install tslib

# RUN npm install react-scripts@5.0.0 -g
COPY . ./
RUN npx next build

# 앱 실행

CMD ["npx", "next", "start"]
