# Base image
FROM node:18-alpine AS base

# Install dependencies only to cache them in docker layer
WORKDIR /app
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Build the project
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy built artifacts from previous stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

# Expose port and define command to start Next server
EXPOSE 3000
CMD ["node", "server.js"]