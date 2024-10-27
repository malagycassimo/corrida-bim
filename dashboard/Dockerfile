# Use the official Bun image as the base
FROM oven/bun:1 as base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if you use one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN bun run build

# Start a new stage for a smaller final image
FROM oven/bun:1-slim as runner

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/next.config.ts ./next.config.ts

# Set environment variables
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["bun", "start"]
