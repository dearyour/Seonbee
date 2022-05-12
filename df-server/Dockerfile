# base image (npm을 갖고 있는 baseimage 중 하나)
FROM node:16.13.1

# Working Directory 지정
WORKDIR /app

# COPY package.json ./
COPY ./ ./

# node의 종속성 다운로드
RUN npm install

CMD ["npm", "start"]