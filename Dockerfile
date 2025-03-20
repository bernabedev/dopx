# Use latest Bun runtime as base image
FROM oven/bun:latest AS builder

# Set working directory
WORKDIR /app

# Copy only package files first (for efficient caching)
COPY package.json bun.lock ./

# Install dependencies 
RUN bun install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the project
RUN bun run build

# Create runtime image
FROM oven/bun:latest

# Install only essential certificates
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install playwright
RUN bunx playwright install-deps 
RUN bunx playwright install webkit

# Set working directory
WORKDIR /app

# Copy from builder stage
COPY  --from=builder /app/ ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
ENV WEB_URL=http://localhost:4321
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Expose the application port
EXPOSE 4321

# Command to run the application
CMD ["bun", "run", "start", "--host", "0.0.0.0"]