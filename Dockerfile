FROM node:18.19.0-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN ls -a

RUN npm install

COPY . .

RUN npm run build
RUN cp .env.example .production.env

CMD ["npm", "run", "start:prod"]