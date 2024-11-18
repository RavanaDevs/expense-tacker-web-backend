# Build stage
FROM node:18-alpine as builder

# Build arguments for environment variables
ARG MONGODB_URI
ARG JWT_SECRET
ARG PORT=5000

# Set environment variables
ENV MONGODB_URI=$MONGODB_URI
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"] 