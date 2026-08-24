# Base image com Node 20 Alpine
FROM node:20-alpine

WORKDIR /app

# Copiar definições de dependências
COPY package.json package-lock.json* ./

# Instalar dependências usando npm
RUN npm config set fetch-retry-maxtimeout 60000 \
    && npm config set fetch-retries 5 \
    && npm install --legacy-peer-deps --no-audit --no-fund

# Copiar o código fonte
COPY . .

# Compilar a aplicação Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
