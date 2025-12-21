import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const COLOR_BORDER = {
  blue: "border-blue-500",
  green: "border-green-500",
  red: "border-red-500",
};

const LEVEL_BADGE = {
  low: "bg-gray-100 text-gray-700",
  normal: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

export default function TaskCard({ task, onToggleCompleted, onDelete, onClick }) {
  return (
    <Card
      className={cn(
        "border-l-4 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-[1.01] cursor-pointer",
        COLOR_BORDER[task.color] || "border-gray-300",
        "hover:border-opacity-80 hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start flex-1 gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleCompleted(task)}
            className="mt-1"
          />

          <div className="space-y-1">
            <p
              className={cn(
                "font-medium leading-snug wrap-break-word",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge
                variant="secondary"
                className={cn("capitalize", LEVEL_BADGE[task.level])}
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
          className="self-end text-destructive sm:self-auto"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
