# version and image name to use
FROM node:24-bookworm-slim

# path of current working dir
WORKDIR /app

# copy both package files
COPY package*.json ./

# clean install
RUN npm ci

# copy from current dir to working dir in container
COPY . .

# run the server
CMD ["npm","run","dev"]

# docker build . -> runs the Dockerfile