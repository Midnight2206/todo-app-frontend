import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";

import {
  useToggleCompletedMutation,
  useDeleteTaskMutation,
} from "@/features/tasks/taskApi";

/* -------------------- STYLE MAP -------------------- */
const COLOR_BORDER = {
  blue: "border-blue-500",
  green: "border-green-500",
  red: "border-red-500",
  yellow: "border-yellow-500",
  purple: "border-purple-500",
};

const LEVEL_BADGE = {
  low: "bg-gray-100 text-gray-700",
  normal: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

/* -------------------- COMPONENT -------------------- */
export default function TaskCard({ task, onClick }) {
  const [toggleCompleted, { isLoading: isToggling }] =
    useToggleCompletedMutation();

  const [deleteTask, { isLoading: isDeleting }] =
    useDeleteTaskMutation();

  /* -------------------- HANDLERS -------------------- */
  const handleToggleCompleted = async () => {
    try {
      await toggleCompleted(task.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // ✅ DOM event
    try {
      await deleteTask(task.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group cursor-pointer border-l-4 transition-all duration-200",
        "hover:shadow-md hover:bg-muted/40",
        COLOR_BORDER[task.color] || "border-gray-300"
      )}
    >
      <CardContent className="flex items-start justify-between gap-4 py-4">
        {/* LEFT */}
        <div
          className="flex items-start gap-3"
          onClick={(e) => e.stopPropagation()} // ✅ chặn bubble cho checkbox
        >
          <Checkbox
            checked={task.completed}
            disabled={isToggling}
            onCheckedChange={handleToggleCompleted}
            className="mt-1"
          />

          <div className="space-y-1">
            <p
              className={cn(
                "font-medium leading-snug",
                task.completed &&
                  "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge
                variant="secondary"
                className={cn(
                  "capitalize",
                  LEVEL_BADGE[task.level]
                )}
              >
                {task.level}
              </Badge>

              <span className="capitalize text-muted-foreground">
                {task.color}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive opacity-70 hover:opacity-100"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
