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

# Install only essential certificates and cron
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    cron \
    curl \
    && update-ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install playwright
RUN bunx playwright install-deps 
RUN bunx playwright install webkit

# Set working directory
WORKDIR /app

# Copy from builder stage
COPY --from=builder /app/ ./

# Create script for API calls
RUN echo '#!/bin/bash\n\
curl -X GET http://localhost:4321/api/exchange-rate\n\
curl -X GET http://localhost:4321/api/history-rate\n'\
> /app/update-rates.sh && chmod +x /app/update-rates.sh

# Set up cron job
RUN echo "10 0 * * * /app/update-rates.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/update-rates-cron \
    && chmod 0644 /etc/cron.d/update-rates-cron \
    && crontab /etc/cron.d/update-rates-cron \
    && touch /var/log/cron.log

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
ENV WEB_URL=http://localhost:4321
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Expose the application port
EXPOSE 4321

# Create startup script that runs both the app and cron, and calls APIs at startup
RUN echo '#!/bin/bash\n\
service cron start\n\
echo "Starting the application..."\n\
bun run start --host 0.0.0.0 & \n\
# Wait for the application to start before calling APIs\n\
echo "Waiting for application to start..."\n\
sleep 10\n\
echo "Calling initial APIs..."\n\
curl -X GET http://localhost:4321/api/exchange-rate\n\
curl -X GET http://localhost:4321/api/history-rate\n\
# Keep the container running with the main process\n\
wait\n'\
> /app/start.sh && chmod +x /app/start.sh

# Command to run the application and cron
CMD ["/app/start.sh"]