# Exemplo de Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "node ensure-db.js && npm run start"]