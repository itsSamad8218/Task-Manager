import { useState } from 'react';
import { authService } from '@/lib/auth';
import TaskList from '@/components/TaskList';
import DemoTaskList from '@/components/DemoTaskList';
import Navbar from '@/components/Navbar';

export default function Index() {
  const [authState, setAuthState] = useState(authService.isAuthenticated());

  const handleAuthChange = () => {
    setAuthState(authService.isAuthenticated());
  };

  const user = authService.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar onAuthChange={handleAuthChange} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {authState && user ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
              <p className="text-gray-400">Manage your tasks and stay productive.</p>
            </div>
            <TaskList />
          </>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Organize Your Tasks
                <span className="block text-2xl text-blue-400 mt-2">Stay Productive, Stay Focused</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A modern task management app with user authentication, real-time updates, and beautiful dark theme. 
                Sign up to create and manage your own tasks!
              </p>
            </div>
            
            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Task Management</h3>
                <p className="text-gray-400">Create, edit, delete, and organize your tasks with ease</p>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure Authentication</h3>
                <p className="text-gray-400">JWT-based authentication keeps your data safe and secure</p>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M9 12h6m-6 4h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Priority & Status</h3>
                <p className="text-gray-400">Set priorities and track completion status for better organization</p>
              </div>
            </div>

            <DemoTaskList />
          </>
        )}
      </main>
    </div>
  );
}