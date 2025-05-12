# Traffic Data Visualization System

A full-stack application for visualizing and analyzing traffic data across different cities and countries.

## System Architecture

The system consists of three main components:

### Backend (Node.js + Express + Prisma)
- **Database**: MySQL 
- **ORM**: Prisma
- **API**: RESTful API built with Express.js
- **Containerization**: Docker
- **Data Model**: 
  - Traffic data records with fields for country, city, location, timestamp, vehicle type, count, speed, and direction
  - Seeded with sample data across multiple countries and cities

### Frontend (React + TypeScript)
- **Framework**: React with TypeScript
- **Development Server**: Vite
- **UI**: tailwind CSS, react-charts 

### Infrastructure
- **Containerization**: Docker and Docker Compose
- **Database Persistence**: Docker volumes
- **Environment Management**: .env files for configuration

## Setup and Execution Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js (v20 or later)
- npm (v10 or later)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd derq_assessment
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Update the environment variables as needed

### Running the Application

#### Option 1: Using the run script (Recommended)
```bash
# Make the script executable
chmod +x run.sh

# Run the application
./run.sh
```

This script will:
1. Start the backend server (Docker containers)
2. Wait for the backend to be ready
3. Start the frontend development server

#### Option 2: Manual Setup

1. Start the backend:
```bash
cd backend
docker-compose up -d
```

2. Start the frontend:
```bash
cd frontend
npm install
npm run dev
```

### Accessing the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Development

### Backend Development
- The backend uses Prisma for database operations
- Migrations are automatically applied on startup
- Sample data is seeded automatically
- API endpoints are documented in the code

### Frontend Development
- Built with React and TypeScript
- Uses Vite for fast development
- Implements responsive design
- Includes data visualization components

## Data Flow
1. Traffic data is stored in MySQL database
2. Backend API provides endpoints to access the data
3. Frontend fetches and visualizes the data
4. Real-time updates are supported through API polling

## Stopping the Application
```bash
# If using the run script, press Ctrl+C
# For manual setup:
cd backend
docker-compose down
``` 