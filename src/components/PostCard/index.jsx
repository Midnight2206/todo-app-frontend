import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function PostCard({ post, onDelete, onClick }) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-xl transition",
        "hover:bg-muted/50"
      )}
    >
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {post.user?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="text-sm font-medium">{post.user}</p>
              <p className="text-xs text-muted-foreground">
                {post.createdAt}
                {post.edited && " · Edited"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {post.title && (
            <h3 className="text-base font-semibold leading-snug">
              {post.title}
            </h3>
          )}

          <p className="whitespace-pre-line text-sm leading-relaxed">
            {post.content}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
