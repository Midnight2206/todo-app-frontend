import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { useForm, Controller, useWatch } from "react-hook-form";
import { LEVELS, COLORS } from "@/utils/constants";
import { getTask, updateTask } from "@/utils/taskApi";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const { data } = await getTask(id);
        setTask(data);
        if (data) reset(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load task");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, reset, navigate]);
  const watchedValues = useWatch({ control });
  const isChanged = task
    ? Object.keys(task).some((key) => {
        if (key === "createdAt") return false;
        return watchedValues?.[key] !== task[key];
      })
    : false;
  const fetchTask = async () => {
      try {
        setLoading(true);
        const { data } = await getTask(id);
        setTask(data);
        if (data) reset(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load task");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
  const onSubmit = async (values) => {
    try {
      await updateTask(task.id, values);
      fetchTask();
      toast.success("Task updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading task...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Task not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white shadow-xl rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>
          <div className="flex gap-2">
            <Button disabled={!isChanged} variant="outline" onClick={() => reset()}>
              Reset
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={!isChanged}>Save</Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-2 text-lg font-semibold">Title</label>
            <Input
              {...register("title", { required: true })}
              className="p-3 text-xl"
              placeholder="Enter task title"
            />
          </div>

          {/* Level */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-lg font-semibold">Level</label>
              <Controller
                control={control}
                name="level"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="p-3 text-lg">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Color */}
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-lg font-semibold">Color</label>
              <Controller
                control={control}
                name="color"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="p-3 text-lg">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Completed */}
          <div className="flex items-center gap-4">
            <Controller
              control={control}
              name="completed"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="text-lg font-medium">Completed</span>
          </div>

          {/* Created Date */}
          <div>
            <label className="block mb-1 text-gray-500">
              Created at: {new Date(task.createdAt).toLocaleString()}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
