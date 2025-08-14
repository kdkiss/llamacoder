# Base image
FROM node:21.1.0-alpine AS base

# Install dependencies only to cache them in docker layer
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Build the project
COPY . .
RUN yarn build && ls -la /app/.next

# Production image, copy all the files and run next
FROM node:21.1.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built artifacts from previous stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

# Expose port and define command to start Next server
EXPOSE 3000

# Add a script to wait for the database to be ready
RUN echo '#!/bin/sh\n\
while ! nc -z db 5432; do\n\
  echo "Waiting for database to be ready..."\n\
  sleep 1\n\
done\n\
echo "Database is ready!"\n\
exec "$@"' > /wait-for-db.sh && chmod +x /wait-for-db.sh

# Install netcat for the health check
RUN apk add --no-cache netcat-openbsd

# Start the application with a delay to ensure the database is ready
CMD ["/wait-for-db.sh", "node", "server.js"]