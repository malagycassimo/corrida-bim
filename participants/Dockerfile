FROM oven/bun:1-debian AS builder
WORKDIR /build
COPY package.json bun.lockb ./
RUN bun install
COPY prisma ./prisma
RUN bunx prisma generate
COPY src ./src
RUN bun build ./src/index.ts --outdir ./dist --target bun

FROM oven/bun:1-debian AS runner
WORKDIR /app
COPY package.json bun.lockb ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/prisma ./prisma
COPY --from=builder /build/dist ./dist

EXPOSE 3002
CMD ["bun", "run", "./dist/index.js"]
