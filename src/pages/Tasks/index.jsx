import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useGetTasksQuery } from "@/features/tasks/taskApi";

export default function Tasks() {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useGetTasksQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to load tasks");
    }
  }, [isError, error]);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between max-w-4xl px-4 py-4 mx-auto">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Todo List
            </h1>
            <p className="text-sm text-slate-500">
              Manage your daily tasks
            </p>
          </div>

          <Button
            onClick={() => setIsAddOpen(true)}
            className="gap-2 shadow-sm"
          >
            <Plus size={16} />
            Add Task
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl px-4 py-6 mx-auto space-y-4">
          {isLoading && (
            <div className="py-10 text-center text-slate-500">
              Loading tasks...
            </div>
          )}

          {!isLoading && tasks.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <p className="text-lg font-medium">No tasks yet</p>
              <p className="text-sm">
                Click <strong>Add Task</strong> to create your first task
              </p>
            </div>
          )}

          {!isLoading &&
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => navigate(`/tasks/${task.id}`)}
              />
            ))}
        </div>
      </main>

      {/* Add Task Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        {/* Overlay đẹp hơn */}
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />

        <DialogContent
          className="max-w-md p-6 bg-white shadow-xl  rounded-xl"
        >
          <DialogTitle>
            <VisuallyHidden>Add New Task</VisuallyHidden>
          </DialogTitle>

          <DialogDescription className="mb-4 text-slate-500">
            Fill in the task details below
          </DialogDescription>

          <AddTaskForm onClose={() => setIsAddOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
