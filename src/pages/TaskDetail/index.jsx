import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, Save, RotateCcw, Clock, Edit3 } from "lucide-react";

import {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "@/features/tasks/taskApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { LEVELS, COLORS } from "@/utils/constants";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* -------------------- API -------------------- */
  const {
    data: task,
    isLoading,
    isError,
  } = useGetTaskByIdQuery(id);

  const [updateTask, { isLoading: isUpdating }] =
    useUpdateTaskMutation();

  /* -------------------- FORM -------------------- */
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      level: "",
      color: "",
    },
  });

  useEffect(() => {
    if (task) reset(task);
  }, [task, reset]);

  const watched = useWatch({ control });

  const isChanged = task
    ? ["title", "level", "color"].some(
        (key) => watched?.[key] !== task[key]
      )
    : false;

  /* -------------------- SUBMIT -------------------- */
  const onSubmit = async (values) => {
    try {
      await updateTask({
        id: task.id,
        taskData: values,
      }).unwrap();

      toast.success("Task updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  /* -------------------- STATES -------------------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading task...
      </div>
    );
  }

  if (isError || !task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg font-semibold">Task not found</p>
        <Button onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={!isChanged}
              onClick={() => reset(task)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            <Button
              disabled={!isChanged || isUpdating}
              onClick={handleSubmit(onSubmit)}
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Card */}
        <div className="p-6 space-y-8 bg-white border shadow-sm rounded-xl">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Title
            </label>
            <Input
              {...register("title")}
              className="text-lg font-medium"
              placeholder="Task title"
            />
          </div>

          {/* Level & Color */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* LEVEL */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Level
              </label>

              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Select level">
                        {field.value && (
                          <span className="font-medium capitalize">
                            {field.value}
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-white rounded-lg shadow-xl">
                      {LEVELS.map((lvl) => (
                        <SelectItem
                          key={lvl}
                          value={lvl}
                          className="py-3 text-base capitalize hover:bg-blue-50"
                        >
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* COLOR */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Color
              </label>

              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-12 bg-white">
                      <SelectValue placeholder="Select color">
                        {field.value && (
                          <div className="flex items-center gap-2">
                            <span
                              className="w-4 h-4 border rounded"
                              style={{
                                backgroundColor: field.value,
                              }}
                            />
                            <span className="font-medium capitalize">
                              {field.value}
                            </span>
                          </div>
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent className="bg-white rounded-lg shadow-xl">
                      {COLORS.map((c) => (
                        <SelectItem
                          key={c}
                          value={c}
                          className="py-3 text-base capitalize hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-4 h-4 border rounded"
                              style={{
                                backgroundColor: c,
                              }}
                            />
                            {c}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 space-y-2 text-sm border-t text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Created at:
              <span className="font-medium text-foreground">
                {new Date(task.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Updated at:
              <span className="font-medium text-foreground">
                {new Date(task.updatedAt).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              {isChanged ? (
                <Badge variant="outline" className="text-amber-600">
                  Unsaved changes
                </Badge>
              ) : (
                <Badge variant="outline" className="text-green-600">
                  Saved
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
