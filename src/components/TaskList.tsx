import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Task, apiService } from '@/lib/api';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await apiService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    high: tasks.filter(t => t.priority === 'high' && t.status === 'pending').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">{taskStats.total}</p>
              <p className="text-sm text-gray-400">Total Tasks</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">{taskStats.pending}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">{taskStats.completed}</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-white">{taskStats.high}</p>
              <p className="text-sm text-gray-400">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <AddTaskForm onTaskAdded={fetchTasks} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value: 'all' | 'pending' | 'completed') => setStatusFilter(value)}>
          <SelectTrigger className="w-full sm:w-40 bg-gray-800 border-gray-700 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
            <SelectItem value="pending" className="text-white hover:bg-gray-700">Pending</SelectItem>
            <SelectItem value="completed" className="text-white hover:bg-gray-700">Completed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priorityFilter} onValueChange={(value: 'all' | 'low' | 'medium' | 'high') => setPriorityFilter(value)}>
          <SelectTrigger className="w-full sm:w-40 bg-gray-800 border-gray-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-white hover:bg-gray-700">All Priority</SelectItem>
            <SelectItem value="low" className="text-white hover:bg-gray-700">Low</SelectItem>
            <SelectItem value="medium" className="text-white hover:bg-gray-700">Medium</SelectItem>
            <SelectItem value="high" className="text-white hover:bg-gray-700">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
            </h3>
            <p className="text-gray-500">
              {tasks.length === 0 
                ? 'Create your first task to get started!' 
                : 'Try adjusting your search or filters'
              }
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={fetchTasks}
              onTaskDeleted={fetchTasks}
            />
          ))
        )}
      </div>
    </div>
  );
}