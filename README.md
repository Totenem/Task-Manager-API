# 🚀 Task Manager API

A robust and scalable Task Management API built with **NestJS**, **Prisma**, and **PostgreSQL**. This API provides complete CRUD operations for tasks and user management with JWT authentication.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 👥 **User Management** - Complete user CRUD operations
- 📝 **Task Management** - Full task lifecycle management
- 🗄️ **PostgreSQL Database** - Robust data persistence with Prisma ORM
- 🐳 **Docker Support** - Easy deployment and development setup
- 📊 **Data Validation** - Input validation with class-validator
- 🏗️ **RESTful API** - Clean and intuitive API design
- 📱 **TypeScript** - Type-safe development experience

## 🏗️ Architecture

```
src/
├── auth/           # Authentication module
├── users/          # User management module
├── tasks/          # Task management module
├── app.module.ts   # Main application module
└── main.ts         # Application entry point
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## 🚀 Quick Start

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd taskmanager-api
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec app npx prisma migrate dev
   ```

5. **Generate Prisma client**
   ```bash
   docker-compose exec app npx prisma generate
   ```

6. **Your API is now running at** `http://localhost:3000`

### Option 2: Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd taskmanager-api
   npm install
   ```

2. **Setup PostgreSQL database**
   - Install PostgreSQL locally
   - Create a database named `taskmanager`
   - Update your `.env` file with database credentials

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

## 🐳 Docker Configuration

The project includes a complete Docker setup:

### `docker-compose.yml`
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/taskmanager
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=taskmanager
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### `Dockerfile`
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

## 📊 Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  tasks     Task[]
  createdAt DateTime @default(now())
}
```

### Task Model
```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  status      String   @default("PENDING")
  dueDate     DateTime?
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks/:userId` | Create new task for user |
| GET | `/tasks/:userId/user` | Get all tasks for user |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

## 📝 API Examples

### Create a User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the API",
    "status": "PENDING",
    "dueDate": "2024-02-15T10:00:00.000Z"
  }'
```

### Get User Tasks
```bash
curl -X GET http://localhost:3000/tasks/1/user
```

### Update Task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS",
    "description": "Updated description"
  }'
```

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode with hot reload |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/taskmanager"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Application
PORT=3000
NODE_ENV="development"
```

## 🗄️ Database Commands

### Reset Database
```bash
npx prisma migrate reset
```

### View Database
```bash
npx prisma studio
```

### Deploy Migrations
```bash
npx prisma migrate deploy
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start:prod
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Powerful open source database

---

⭐ **Star this repository if you found it helpful!**

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me directly
- Check the documentation

**Happy Coding! 🎉**