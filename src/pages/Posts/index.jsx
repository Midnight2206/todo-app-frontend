import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPostForm from "@/components/AddPostForm";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/features/posts/postApi"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Posts() {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Không thể tải danh sách bài viết");
    }
  }, [isError, error]);
  const handleEdit = (id) => {
    navigate(`/posts/edit/${id}`);
  };
  
  return (
    <div className="flex flex-col h-full overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="sticky top-0 z-10 border-b shadow-sm bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-3xl px-4 py-5 mx-auto">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-transparent bg-linear-to-r from-primary to-primary/70 bg-clip-text">
              Bài viết của bạn
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              Quản lý và chia sẻ nội dung của bạn
            </p>
          </div>

          <Button
            onClick={() => setIsAddOpen(true)}
            className="gap-2 px-5 font-semibold transition-all rounded-full shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Tạo bài viết
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl px-4 py-6 mx-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="absolute inset-0 w-12 h-12 rounded-full bg-primary/20 animate-ping" />
              </div>
              <p className="font-medium text-center text-muted-foreground animate-pulse">
                Đang tải bài viết...
              </p>
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="p-6 rounded-full bg-muted/50">
                <Sparkles className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-bold text-foreground">
                  Chưa có bài viết nào
                </h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Bắt đầu chia sẻ suy nghĩ và ý tưởng của bạn bằng cách tạo bài
                  viết đầu tiên!
                </p>
              </div>
              <Button
                onClick={() => setIsAddOpen(true)}
                className="gap-2 px-6 mt-4 transition-all rounded-full shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Tạo bài viết đầu tiên
              </Button>
            </div>
          )}

          {!isLoading && posts.length > 0 && (
            <div className="space-y-4 duration-500 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between px-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {posts.length}
                  </span>{" "}
                  bài viết
                </p>
              </div>

              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="duration-300 animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PostCard
                    post={post}
                    onEdit={handleEdit}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Post Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent
          className={`
      max-w-2xl w-full max-h-[90vh] overflow-y-auto
      bg-(--card) text-(--card-foreground)
      rounded-(--radius) p-6 sm:p-8
      border border-(--border)
      shadow-lg
    `}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h2
                className="
          text-2xl sm:text-3xl font-extrabold
          bg-linear-to-r from-(--primary) to-[var(--primary)/70]
          bg-clip-text text-transparent
        "
              >
                Tạo bài viết mới
              </h2>
              <p className="text-sm sm:text-base text-(--muted-foreground)">
                Chia sẻ suy nghĩ, kiến thức và trải nghiệm của bạn với mọi người
              </p>
            </div>

            {/* Visually Hidden for accessibility */}
            <DialogTitle>
              <VisuallyHidden>Tạo bài viết mới</VisuallyHidden>
            </DialogTitle>
            <DialogDescription>
              <VisuallyHidden>
                Vui lòng điền thông tin bài viết bên dưới
              </VisuallyHidden>
            </DialogDescription>

            {/* Form */}
            <div className="pt-4 border-t border-(--border)">
              <AddPostForm
                onClose={() => setIsAddOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
