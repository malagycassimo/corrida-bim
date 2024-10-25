# Use the official Bun image | Use a imagem oficial do Bun
FROM oven/bun:1-debian

WORKDIR /app

# Update apt | Atualizar o apt
RUN apt-get update

# Install curl using apt | Instalar o curl usando o apt
RUN apt-get install -y curl

# Add NodeSource repository and install Node.js | Adicionar repositório NodeSource e instalar Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Copy package.json and bun.lockb | Copiar package.json e bun.lockb
COPY package.json bun.lockb /app/

# Copy prisma directory before installing dependencies | Copiar o diretório prisma antes de instalar as dependências
COPY prisma /app/prisma

# Install dependencies and generate Prisma client | Instalar dependências e gerar cliente Prisma
RUN bun install

RUN bunx prisma generate

# Copy the rest of the application | Copiar o restante da aplicação
COPY . /app/

# Expose port 3002 | Expor a porta 3002
EXPOSE 3002

# Define entrypoint | Definir entrypoint
ENTRYPOINT ["bun", "run", "src/index.ts"]
