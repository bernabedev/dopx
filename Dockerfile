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

# Install necessary system dependencies for Playwright
# RUN apt-get update && apt-get install -y libevent-2.1-7 libopus0 libfontconfig1 \
#   libepoxy0 libfreetype6 libjpeg62-turbo libpng16-16 libwebp6 libwebpdemux2 \
#   libwebpmux3 libgtk-3-0 libgdk-pixbuf-2.0-0 libpangocairo-1.0-0 libpango-1.0-0 \
#   libharfbuzz0b libharfbuzz-icu0 libcairo-gobject2 libcairo2 libsqlite3-0 \
#   libxslt1.1 liblcms2-2 libsecret-1-0 libhyphen0 libx11-6 libx11-xcb1 libxcb1 \
#   libpsl5 libnghttp2-14 libdbus-1-3 libjson-glib-1.0-0 libatk-bridge2.0-0 \
#   libwoff1 libflite1 \
#   libgbm1 libunwind8 libdw1 libegl1 && rm -rf /var/lib/apt/lists/*

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

# Expose the application port
EXPOSE 4321

# Command to run the application
CMD ["bun", "run", "start", "--host", "0.0.0.0"]