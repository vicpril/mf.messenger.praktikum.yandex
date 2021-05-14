# Build stage
FROM ubuntu:20.04 as build-stage
RUN apt update && apt install -y nodejs && apt install -y npm
RUN npm install webpack -g
RUN npm install cross-env -g

WORKDIR /app
COPY package.json ./

RUN npm install
COPY ./client ./client
COPY ./webpack.config.js ./
RUN npm run build


# Production stage
FROM ubuntu:20.04 as production-stage
RUN apt update && apt install -y nodejs && apt install -y npm
RUN npm install express
WORKDIR /var/www
COPY ./server ./server
COPY --from=build-stage /app/build ./static

EXPOSE 3000
CMD ["node", "./server/index.js"]
