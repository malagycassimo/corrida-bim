FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npx pnpm install && npx prisma generate

CMD ["npm", "start"]
