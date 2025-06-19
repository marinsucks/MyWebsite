FROM node:18-alpine

#! Make sure that frontend source code is linked as a volume in /app
WORKDIR /app
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]