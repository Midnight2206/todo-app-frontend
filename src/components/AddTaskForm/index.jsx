import { useForm, Controller } from "react-hook-form";
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

import { LEVELS, COLORS } from "@/utils/constants";
import { useCreateTaskMutation } from "@/features/tasks/taskApi";

export default function AddTaskForm({ onClose }) {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: "",
      level: LEVELS[0],
      color: COLORS[0],
    },
  });

  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onSubmit = async (values) => {
    try {
      await createTask(values).unwrap();
      toast.success("Task added successfully");
      reset();
      onClose?.();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Title
        </label>
        <Input
          {...register("title", { required: true })}
          placeholder="Enter task title"
          className="transition h-11 bg-slate-50 focus:bg-white"
        />
      </div>

      {/* Level & Color */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Level */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Level
          </label>
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="transition h-11 bg-slate-50 hover:bg-slate-100">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent
                  className="
                    bg-slate-50
                    border
                    shadow-xl
                    rounded-lg
                    data-[state=open]:animate-in
                    data-[state=closed]:animate-out
                  "
                >
                  {LEVELS.map((lvl) => (
                    <SelectItem
                      key={lvl}
                      value={lvl}
                      className="
                        cursor-pointer
                        rounded-md
                        px-3 py-2
                        hover:bg-slate-100
                        focus:bg-slate-100
                        data-[state=checked]:bg-slate-200
                      "
                    >
                      {lvl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Color */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            Color
          </label>
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="transition h-11 bg-slate-50 hover:bg-slate-100">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent
                  className="border rounded-lg shadow-xl bg-slate-50"
                >
                  {COLORS.map((color) => (
                    <SelectItem
                      key={color}
                      value={color}
                      className="
                        cursor-pointer
                        rounded-md
                        px-3 py-2
                        hover:bg-slate-100
                        focus:bg-slate-100
                        data-[state=checked]:bg-slate-200
                      "
                    >
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Task"}
        </Button>
      </div>
    </form>
  );
}
