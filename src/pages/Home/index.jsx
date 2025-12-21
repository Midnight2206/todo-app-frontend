import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTaskForm from "@/components/AddTaskForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Plus } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { getTasks, deleteTask, toggleCompleted } from "@/utils/taskApi";
import { toast } from "sonner";

export default function Home() {
    const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleToggleCompleted = async (task) => {
    try {
      await toggleCompleted(task.id);
      fetchTasks()
        toast.success("Task updated");
    } catch (err) {
      console.log(err);
      toast.error("Toggle failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      toast.success("Task deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background">
        <div className="flex items-center justify-between max-w-3xl px-4 py-4 mx-auto">
          <div>
            <h1 className="text-xl font-semibold">Todo List</h1>
            <p className="text-sm text-muted-foreground">
              Manage your daily tasks
            </p>
          </div>

          <Button onClick={() => setIsAddOpen(true)} className="gap-2">
            <Plus size={16} />
            Add Task
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl px-4 py-6 mx-auto space-y-4">
          {loading && (
            <p className="text-center text-muted-foreground">
              Loading tasks...
            </p>
          )}
          {!loading && tasks.length === 0 && (
            <p className="text-center text-muted-foreground">No tasks found</p>
          )}
          {!loading &&
            tasks.map((task) => (
              <TaskCard
                onClick={() => navigate(`/tasks/${task.id}`)}
                key={task.id}
                task={task}
                onToggleCompleted={handleToggleCompleted}
                onDelete={handleDelete}
              />
            ))}
        </div>
      </div>

      {/* Add Task Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <h2 className="mb-4 text-lg font-semibold">Add New Task</h2>
          <DialogTitle><VisuallyHidden>Add New Task</VisuallyHidden></DialogTitle>
          <DialogDescription>
            Please fill in the task details below.
          </DialogDescription>
          <AddTaskForm
            onClose={() => setIsAddOpen(false)}
            onTaskAdded={handleTaskAdded}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
