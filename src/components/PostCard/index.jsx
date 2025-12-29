import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeletePostMutation} from "@/features/posts/postApi"


export default function PostCard({ post }) {
  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const navigate = useNavigate();

  const handleDelPost = async (id) => {
    deletePost(id)
      .unwrap()
      .then(() => {
        toast.success("Đã xóa bài viết thành công! ✨");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xóa bài viết thất bại");
      });
  }
  return (
    <div className="relative">
      <Card
      onClick={() => navigate(`/posts/${post.id}`)}
      className={cn(
        "cursor-pointer rounded-xl transition",
        "hover:bg-muted/50"
      )}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold rounded-full bg-primary/10 text-primary">
              {post.user?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <p className="text-sm font-medium">{post.user}</p>
              <p className="text-xs text-muted-foreground">
                {post.createdAt}
                {(post.updatedAt && post.updatedAt !== post.createdAt) && " · Edited"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              handleDelPost(post.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {post.title && (
            <h3 className="text-base font-semibold leading-snug">
              {post.title}
            </h3>
          )}

          <p className="text-sm leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>
      </CardContent>
    </Card>
    {isDeleteLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded-xl">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      )}
    </div>
  );
}
