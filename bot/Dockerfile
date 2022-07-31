FROM node:14.20-alpine
EXPOSE 3000
COPY package*.json .
RUN npm install
COPY . .
ENTRYPOINT [ "node", "app.js" ]