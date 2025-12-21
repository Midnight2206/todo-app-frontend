import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LEVELS, COLORS } from "@/utils/constants";
import { createTask } from "@/utils/taskApi";

export default function AddTaskForm({ onClose, onTaskAdded }) {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: "",
      level: "normal",
      color: "blue",
    },
  });

  const onSubmit = async (values) => {
    try {
      const newTask = await createTask(values);
      onTaskAdded(newTask);
      toast.success("Task added!");
      reset();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <Input {...register("title", { required: true })} placeholder="Task title" />
      </div>

      {/* Level & Color */}
      <div className="flex gap-2">
        {/* Level */}
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium">Level</label>
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
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
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium">Color</label>
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {COLORS.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}
