# Use the official Node.js 20 image as the base image
FROM node:20.11.0-alpine AS base

# Create a non-root user
RUN adduser -D nonroot

# Stage 1: Build the application
FROM base AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Switch to non-root user
USER nonroot

# Stage 2: Run the application
FROM base AS runner

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./package-lock.json ./

# Install only production dependencies
RUN npm install --ignore-scripts --omit=dev

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist

# Switch to non-root user
USER nonroot

# Start the application
CMD ["npm", "run", "start:prod"]
