import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, User, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { authService } from '@/lib/auth';

interface NavbarProps {
  onAuthChange: () => void;
}

export default function Navbar({ onAuthChange }: NavbarProps) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      await authService.login(loginData.email, loginData.password);
      setLoginOpen(false);
      setLoginData({ email: '', password: '' });
      onAuthChange();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError('Passwords do not match');
      setSignupLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setSignupError('Password must be at least 6 characters long');
      setSignupLoading(false);
      return;
    }

    try {
      await authService.register(signupData.email, signupData.password, signupData.name);
      setSignupOpen(false);
      setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
      onAuthChange();
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    onAuthChange();
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">TaskManager</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center text-gray-300">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Login Dialog */}
                <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Sign In</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Enter your credentials to access your tasks
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4">
                      {loginError && (
                        <Alert className="bg-red-900/50 border-red-800 text-red-200">
                          <AlertDescription>{loginError}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-gray-300">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          placeholder="Enter your password"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {loginLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          'Sign In'
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Signup Dialog */}
                <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Create Account</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Sign up to start managing your tasks
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSignup} className="space-y-4">
                      {signupError && (
                        <Alert className="bg-red-900/50 border-red-800 text-red-200">
                          <AlertDescription>{signupError}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-gray-300">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                          placeholder="Enter your password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm" className="text-gray-300">Confirm Password</Label>
                        <Input
                          id="signup-confirm"
                          type="password"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                          placeholder="Confirm your password"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={signupLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        {signupLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}