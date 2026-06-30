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


# FROM node:24-bookworm-slim AS builder

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# FROM node:24-bookworm-slim

# WORKDIR /app

# COPY package*.json ./

# RUN npm ci --omit=dev

# COPY --from=builder /app/dist ./dist

# EXPOSE 3001

# CMD ["node", "dist/index.js"]