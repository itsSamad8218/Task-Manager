# Deployment Guide

## Backend Deployment on Vercel

### Step 1: Prepare Backend for Vercel
1. The backend is already configured with `vercel.json` and serverless function setup
2. Database will use SQLite with file storage (consider upgrading to PostgreSQL for production)

### Step 2: Deploy to Vercel
1. **Install Vercel CLI** (if not installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy Backend**:
   ```bash
   cd server
   
   
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings in Vercel dashboard
   - Add environment variables:
     - `JWT_SECRET`: A secure random string (e.g., generate with `openssl rand -base64 32`)
     - `NODE_ENV`: `production`

### Step 3: Get Backend URL
- After deployment, you'll get a URL like: `https://your-backend-name.vercel.app`
- Test it by visiting: `https://your-backend-name.vercel.app/api/health`

## Frontend Deployment on GitHub Pages

### Step 1: Update API URLs
1. Update the backend URL in your frontend code:
   - Edit `src/lib/auth.ts`
   - Edit `src/lib/api.ts`
   - Replace `http://localhost:3001/api` with your Vercel backend URL

### Step 2: Prepare for GitHub Pages
1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/task-manager-app.git
   git push -u origin main
   ```

2. **Install gh-pages** (for easy deployment):
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json** with homepage and deploy script:
   ```json
   {
     "homepage": "https://yourusername.github.io/task-manager-app",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

### Step 3: Deploy to GitHub Pages
```bash
npm run deploy
```

### Step 4: Enable GitHub Pages
1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: gh-pages
5. Folder: / (root)

## Alternative: Vercel for Frontend Too

If you prefer Vercel for both:

1. **Deploy Frontend to Vercel**:
   ```bash
   vercel --prod
   ```

2. **Configure Build Settings** in Vercel:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## Environment Variables Summary

### Backend (Vercel):
- `JWT_SECRET`: Your secure JWT secret key
- `NODE_ENV`: `production`

### Frontend:
- Update API base URLs to point to your deployed backend

## Post-Deployment Checklist

1. ✅ Backend health check responds at `/api/health`
2. ✅ Frontend loads without errors
3. ✅ Registration works (creates new users)
4. ✅ Login works (authenticates users)
5. ✅ Task CRUD operations work
6. ✅ CORS is properly configured
7. ✅ All API endpoints respond correctly

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Update CORS configuration in `server.js`
2. **API Not Found**: Check Vercel function deployment
3. **Database Issues**: Consider upgrading to PostgreSQL for production
4. **Authentication Fails**: Verify JWT_SECRET is set correctly

### Database Upgrade (Recommended for Production):
Consider using Vercel Postgres or Supabase for production instead of SQLite:
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres
- Supabase: https://supabase.com/

## URLs After Deployment:
- Backend: `https://your-backend-name.vercel.app`
- Frontend: `https://yourusername.github.io/task-manager-app`