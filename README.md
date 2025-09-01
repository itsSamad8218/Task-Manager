# Task Manager App

A modern, full-stack task management application with user authentication, CRUD operations, and an attractive dark theme.

LIVE DEMO-VERCEL- https://task-manager-git-main-abdul-samads-projects-4cc4b913.vercel.app/

## Features

- **User Authentication**: JWT-based sign-up/login system
- **Task Management**: Add, edit, delete, and toggle task status (pending/completed)
- **Search & Filter**: Search tasks by title/description and filter by status/priority
- **Dark Theme**: Modern, attractive dark UI with smooth animations
- **Real-time Stats**: Dashboard showing task statistics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React.js with TypeScript
- shadcn/ui components
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express.js
- SQLite database
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   pnpm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   
   
   ```

4. **Environment Setup**
   Create a `.env` file in the `server` directory:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   PORT=3001
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

2. **Start the Frontend (in a new terminal)**
   ```bash
   pnpm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Deployment Options

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `pnpm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or any static hosting service
3. Update the API base URL in `src/lib/auth.ts` and `src/lib/api.ts` to your backend URL

### Backend Deployment

#### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or GitHub integration

#### Render
1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables

#### Railway/AWS/DigitalOcean
Follow similar steps for your preferred platform

### Environment Variables for Production
```env
JWT_SECRET=your-production-jwt-secret-key
PORT=3001
NODE_ENV=production
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Database Schema

### Users Table
- id (INTEGER, PRIMARY KEY)
- email (TEXT, UNIQUE)
- password (TEXT, hashed)
- name (TEXT)
- created_at (DATETIME)

### Tasks Table
- id (INTEGER, PRIMARY KEY)
- user_id (INTEGER, FOREIGN KEY)
- title (TEXT)
- description (TEXT)
- status ('pending' | 'completed')
- priority ('low' | 'medium' | 'high')
- created_at (DATETIME)
- updated_at (DATETIME)

