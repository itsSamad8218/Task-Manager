# Task Manager App - MVP Implementation Plan

## Core Features to Implement:
1. User Authentication (JWT-based)
2. Task CRUD operations
3. Task status toggle (pending/completed)
4. Attractive dark theme UI
5. Backend API with Node.js
6. Database integration

## Files to Create/Modify:

### Frontend (React.js with shadcn/ui):
1. **src/pages/Index.tsx** - Main dashboard with task list
2. **src/pages/Login.tsx** - Login page
3. **src/pages/Register.tsx** - Registration page
4. **src/components/TaskList.tsx** - Task list component
5. **src/components/TaskItem.tsx** - Individual task component
6. **src/components/AddTaskForm.tsx** - Add/edit task form
7. **src/lib/auth.ts** - Authentication utilities
8. **src/lib/api.ts** - API client functions

### Backend (Node.js):
1. **server/server.js** - Express server setup
2. **server/routes/auth.js** - Authentication routes
3. **server/routes/tasks.js** - Task CRUD routes
4. **server/middleware/auth.js** - JWT middleware
5. **server/models/User.js** - User model
6. **server/models/Task.js** - Task model
7. **server/config/database.js** - Database configuration
8. **package.json** - Backend dependencies

### Configuration:
- Update **index.html** title
- Modify **src/App.tsx** for routing
- Add dark theme styling

## Tech Stack:
- Frontend: React.js, TypeScript, shadcn/ui, Tailwind CSS
- Backend: Node.js, Express.js, JWT
- Database: SQLite (for simplicity, can be upgraded to PostgreSQL)
- Authentication: JWT tokens
- Styling: Dark theme with modern UI

## Implementation Priority:
1. Setup backend server and database
2. Implement authentication system
3. Create task CRUD API
4. Build frontend components
5. Integrate frontend with backend
6. Apply dark theme styling
7. Test and deploy