FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
COPY .env .env
EXPOSE 5000
CMD npx sequelize-cli db:migrate --env production && npm start
