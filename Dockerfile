FROM node:10

ENV TZ="/usr/share/zoneinfo/Asia/Seoul"
ENV HOST 0.0.0.0

ARG PROJECT_DIR=/pizza/web

COPY package.json ${PROJECT_DIR}/package.json
COPY package-lock.json ${PROJECT_DIR}}/package-lock.json
WORKDIR ${PROJECT_DIR}
RUN npm install

COPY . ${PROJECT_DIR}

EXPOSE 3000

# RUN npm run start
CMD ["npm", "start"]