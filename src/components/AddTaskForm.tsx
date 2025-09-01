import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Loader2 } from 'lucide-react';
import { apiService, CreateTaskData } from '@/lib/api';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const taskData: CreateTaskData = {
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      };
      
      await apiService.createTask(taskData);
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsOpen(false);
      
      onTaskAdded();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Task
      </Button>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Add New Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              placeholder="Enter task title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 min-h-[80px]"
              placeholder="Enter task description"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-300">Priority</Label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
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
              type="submit"
              disabled={loading || !title.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Task'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}