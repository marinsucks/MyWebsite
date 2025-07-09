FROM node:18-alpine

#! Make sure that frontend source code is linked as a volume in /app
WORKDIR /app

#TODO: check problems with all volumes from docker-compose.yml, none seems to be working

#COPY package*.json ./
RUN npm install

#COPY . .
RUN npm run build

CMD ["npm", "run", "start"]