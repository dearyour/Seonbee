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

<<<<<<< HEAD
RUN npm install -g npm@8.10.0
# RUN npm --version
RUN npm install --legacy-peer-deps
# RUN npm install --legacy-peer-deps --production
# RUN npm --version
=======
RUN npm install -g npm@8.3.0
# RUN npm install --legacy-peer-deps
RUN npm i
>>>>>>> b69e31743e060b7e155c0d4f7484a2343248c512
# RUN npm install react-scripts@5.0.0 -g
COPY . ./
RUN npx next build

# 앱 실행

CMD ["npx", "next", "start"]
