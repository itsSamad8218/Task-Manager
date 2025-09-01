import { authService } from './auth';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high';
}

class ApiService {
  private baseUrl = 'http://localhost:3001/api';

  private getHeaders(): HeadersInit {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  }

  async createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create task');
    }

    return response.json();
  }

  async updateTask(taskId: number, taskData: UpdateTaskData): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update task');
    }

    return response.json();
  }

  async deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete task');
    }
  }

  async toggleTaskStatus(taskId: number, currentStatus: string): Promise<Task> {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    return this.updateTask(taskId, { status: newStatus });
  }
}

export const apiService = new ApiService();