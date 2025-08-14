# Base image
FROM node:21.1.0-slim AS base

# Install dependencies only to cache them in docker layer
WORKDIR /app
COPY package.json ./
RUN yarn install --network-timeout 100000

# Build the project
COPY . .
# Set a dummy DATABASE_URL for build time
ENV DATABASE_POSTGRES_PRISMA_URL="postgresql://dummy:dummy@dummy:5432/dummy?schema=public"
RUN yarn build

# Production image, copy all the files and run next
FROM node:21.1.0-slim AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built artifacts from previous stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

# Expose port and define command to start Next server
EXPOSE 3000
CMD ["node", "server.js"]
