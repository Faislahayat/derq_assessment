# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma Client
RUN npm ci && \
    npx prisma generate && \
    npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build && \
    rm -rf src/ && \
    rm -rf node_modules/.cache

# Production stage
FROM node:20-slim

WORKDIR /app

# Install only the necessary system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean

# Copy only the necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production --omit=dev && \
    npm cache clean --force && \
    rm -rf /root/.npm

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/app.js"]