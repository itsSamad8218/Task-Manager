interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

class AuthService {
  private baseUrl = 'http://localhost:3001/api';

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      this.setToken(data.token);
      this.setUser(data.user);
      
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please make sure the backend is running on port 3001.');
      }
      throw error;
    }
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      this.setToken(data.token);
      this.setUser(data.user);
      
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please make sure the backend is running on port 3001.');
      }
      throw error;
    }
  }

  logout(): void {
    this.removeToken();
    // Don't redirect, just update state
  }
}

export const authService = new AuthService();
export type { User, AuthResponse };