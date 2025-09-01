import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Clock, AlertCircle, Calendar, Edit2, Trash2, Save, X, Plus, Lock } from 'lucide-react';

interface DemoTask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

const initialDemoTasks: DemoTask[] = [
  {
    id: 1,
    title: "Complete quarterly sales report",
    description: "Compile Q4 sales data and create comprehensive report for management review",
    status: "pending",
    priority: "high",
    created_at: "2024-01-15"
  },
  {
    id: 2,
    title: "Review marketing campaign performance",
    description: "Analyze metrics from recent social media campaigns and prepare optimization recommendations",
    status: "completed",
    priority: "medium",
    created_at: "2024-01-14"
  },
  {
    id: 3,
    title: "Update project documentation",
    description: "Revise technical documentation for the new product features and API endpoints",
    status: "pending",
    priority: "low",
    created_at: "2024-01-13"
  },
  {
    id: 4,
    title: "Schedule team standup meetings",
    description: "Organize weekly standup meetings for the development team and send calendar invites",
    status: "completed",
    priority: "high",
    created_at: "2024-01-12"
  },
  {
    id: 5,
    title: "Conduct code review session",
    description: "Review pull requests from team members and provide feedback on code quality",
    status: "pending",
    priority: "medium",
    created_at: "2024-01-11"
  },
  {
    id: 6,
    title: "Prepare client presentation",
    description: "Create slides for upcoming client meeting showcasing project progress and next steps",
    status: "pending",
    priority: "high",
    created_at: "2024-01-10"
  },
  {
    id: 7,
    title: "Database backup and maintenance",
    description: "Perform routine database maintenance and ensure backup systems are functioning properly",
    status: "completed",
    priority: "medium",
    created_at: "2024-01-09"
  },
  {
    id: 8,
    title: "Employee onboarding checklist",
    description: "Update onboarding process documentation and prepare materials for new team member",
    status: "pending",
    priority: "low",
    created_at: "2024-01-08"
  }
];

export default function DemoTaskList() {
  const [tasks, setTasks] = useState<DemoTask[]>(initialDemoTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' });
  const [editTask, setEditTask] = useState({ title: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    high: tasks.filter(t => t.priority === 'high' && t.status === 'pending').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600 hover:bg-red-700';
      case 'medium': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'low': return 'bg-green-600 hover:bg-green-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggleTaskStatus = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: DemoTask = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      status: 'pending',
      priority: newTask.priority,
      created_at: new Date().toISOString().split('T')[0]
    };
    
    setTasks([task, ...tasks]);
    setNewTask({ title: '', description: '', priority: 'medium' });
    setIsAddingTask(false);
  };

  const startEdit = (task: DemoTask) => {
    setEditingTask(task.id);
    setEditTask({
      title: task.title,
      description: task.description,
      priority: task.priority
    });
  };

  const saveEdit = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, title: editTask.title.trim(), description: editTask.description.trim(), priority: editTask.priority }
        : task
    ));
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTask({ title: '', description: '', priority: 'medium' });
  };

  return (
    <div className="space-y-6">
      {/* Demo Notice */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-center">
          <Lock className="h-5 w-5 text-blue-400 mr-3" />
          <div>
            <h3 className="text-blue-200 font-medium">Demo Mode - Fully Functional</h3>
            <p className="text-blue-300 text-sm">
              Try all features! Add, edit, delete, and toggle tasks. Sign up to save your data permanently.
            </p>
          </div>
        </div>
      </div>

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
      {!isAddingTask ? (
        <Button
          onClick={() => setIsAddingTask(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Task (Demo)
        </Button>
      ) : (
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <Textarea
                  placeholder="Task description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Select value={newTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="low" className="text-white hover:bg-gray-600">Low</SelectItem>
                    <SelectItem value="medium" className="text-white hover:bg-gray-600">Medium</SelectItem>
                    <SelectItem value="high" className="text-white hover:bg-gray-600">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={addTask}
                  disabled={!newTask.title.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Task
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTask({ title: '', description: '', priority: 'medium' });
                  }}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white mb-4">Your Tasks</h3>
        {tasks.map(task => (
          <Card key={task.id} className={`bg-gray-800 border-gray-700 transition-all duration-200 ${
            task.status === 'completed' ? 'opacity-75' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.status === 'completed'}
                  onCheckedChange={() => toggleTaskStatus(task.id)}
                  className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                
                <div className="flex-1 min-w-0">
                  {editingTask === task.id ? (
                    <div className="space-y-3">
                      <Input
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Task title"
                      />
                      <Textarea
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white min-h-[60px]"
                        placeholder="Task description (optional)"
                      />
                      <Select value={editTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditTask({ ...editTask, priority: value })}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="low" className="text-white hover:bg-gray-600">Low</SelectItem>
                          <SelectItem value="medium" className="text-white hover:bg-gray-600">Medium</SelectItem>
                          <SelectItem value="high" className="text-white hover:bg-gray-600">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div>
                      <h3 className={`font-medium text-white mb-1 ${
                        task.status === 'completed' ? 'line-through text-gray-400' : ''
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm text-gray-400 mb-2 ${
                          task.status === 'completed' ? 'line-through' : ''
                        }`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs">
                        <Badge className={`${getPriorityColor(task.priority)} text-white border-0`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(task.created_at)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  {editingTask === task.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => saveEdit(task.id)}
                        disabled={!editTask.title.trim()}
                        className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 p-0"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 h-8 w-8 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(task)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 h-8 w-8 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteTask(task.id)}
                        className="border-red-600 text-red-400 hover:bg-red-900/20 h-8 w-8 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}