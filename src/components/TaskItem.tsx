import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2, Save, X, Calendar } from 'lucide-react';
import { Task, apiService } from '@/lib/api';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>(task.priority);
  const [loading, setLoading] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      await apiService.toggleTaskStatus(task.id, task.status);
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await apiService.updateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        priority: editPriority,
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setLoading(true);
    try {
      await apiService.deleteTask(task.id);
      onTaskDeleted();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <Card className={`bg-gray-800 border-gray-700 transition-all duration-200 ${
      task.status === 'completed' ? 'opacity-75' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.status === 'completed'}
            onCheckedChange={handleToggleStatus}
            disabled={loading}
            className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Task title"
                />
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white min-h-[60px]"
                  placeholder="Task description (optional)"
                />
                <Select value={editPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setEditPriority(value)}>
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
            {isEditing ? (
              <>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={loading || !editTitle.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white h-8 w-8 p-0"
                >
                  <Save className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(task.title);
                    setEditDescription(task.description || '');
                    setEditPriority(task.priority);
                  }}
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
                  onClick={() => setIsEditing(true)}
                  disabled={loading}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 h-8 w-8 p-0"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={loading}
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
  );
}