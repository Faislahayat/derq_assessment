#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting backend server...${NC}"
cd backend
docker-compose up -d

# Wait for backend to be ready
echo -e "${BLUE}Waiting for backend to be ready...${NC}"
sleep 10

echo -e "${BLUE}Starting frontend server...${NC}"
cd ../frontend
npm install
npm run dev

# Keep the script running
wait 