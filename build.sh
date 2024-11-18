#!/bin/bash

# Check if environment variables are provided
if [ -z "$MONGODB_URI" ] || [ -z "$JWT_SECRET" ]; then
    echo "Error: Required environment variables are not set"
    echo "Please set MONGODB_URI and JWT_SECRET"
    exit 1
fi

# Default port if not provided
PORT=${PORT:-5000}

# Build the Docker image with build arguments
docker build \
    --build-arg MONGODB_URI=$MONGODB_URI \
    --build-arg JWT_SECRET=$JWT_SECRET \
    --build-arg PORT=$PORT \
    -t expense-tracker-api .

echo "Build completed successfully!"
echo "You can run the container using:"
echo "docker run -p $PORT:$PORT expense-tracker-api" 