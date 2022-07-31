FROM node:latest
COPY package*.json .
RUN npm install
COPY . .
ENTRYPOINT [ "node", "app.js" ]