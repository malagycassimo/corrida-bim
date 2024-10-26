# Stage 1: Prisma Migration | Etapa 1: Migração do Prisma
FROM node:18-slim AS prisma
WORKDIR /prisma-gen
COPY prisma ./prisma
COPY package.json ./
RUN npm install prisma --save-dev
RUN npx prisma generate

# Stage 2: Build | Etapa 2: Build
FROM oven/bun:1-debian AS builder
WORKDIR /build
COPY package.json bun.lockb ./
COPY src ./src
COPY --from=prisma /prisma-gen/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma /prisma-gen/prisma ./prisma
RUN bun install
RUN bun build ./src/index.ts --outdir ./dist --target bun

# Stage 3: Final Image | Etapa 3: Imagem Final
FROM oven/bun:1-debian AS runner
WORKDIR /app

# Copy only necessary files | Copiar apenas arquivos necessários
COPY package.json bun.lockb ./
COPY --from=prisma /prisma-gen/node_modules/.prisma ./node_modules/.prisma
COPY --from=prisma /prisma-gen/prisma ./prisma
COPY --from=builder /build/dist ./dist

# Install production dependencies only | Instalar apenas dependências de produção
RUN bun install --production

EXPOSE 3002

CMD ["bun", "run", "./dist/index.js"]
