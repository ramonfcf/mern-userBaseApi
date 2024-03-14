FROM node:lts-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["node", "app/index.js"]
