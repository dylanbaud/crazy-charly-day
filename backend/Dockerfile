FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma db pull
RUN npx prisma generate

EXPOSE 4000

CMD ["node", "server.js"]
