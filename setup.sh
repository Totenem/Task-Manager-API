#!/bin/bash

echo "🚀 Setting up Task Manager API..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

# Build and start containers
echo "🐳 Building and starting Docker containers..."
docker-compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec app npx prisma migrate dev --name init

# Generate Prisma client
echo "🔧 Generating Prisma client..."
docker-compose exec app npx prisma generate

echo "✅ Setup complete!"
echo "🌐 API is running at: http://localhost:3000"
echo "🏥 Health check: http://localhost:3000/health"
echo "📊 Database: PostgreSQL on localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "  docker-compose logs -f app    # View app logs"
echo "  docker-compose down           # Stop containers"
echo "  docker-compose exec app npx prisma studio  # Open Prisma Studio"
