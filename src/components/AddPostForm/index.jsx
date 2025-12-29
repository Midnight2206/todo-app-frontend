import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Send, X, FileText, Type } from "lucide-react";

import { useCreatePostMutation } from "@/features/posts/postApi";

export default function AddPostForm({ onClose }) {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  
const titleValue = useWatch({ control, name: "title" });
const contentValue = useWatch({ control, name: "content" });

  const onSubmit = async (data) => {
    try {
      await createPost(data).unwrap();
      toast.success("Đã tạo bài viết thành công! ✨");
      reset();
      onClose?.();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || "Tạo bài viết thất bại");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Title Field */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Type className="w-4 h-4 text-primary" />
          Tiêu đề bài viết
          <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Input
            {...register("title", { required: "Tiêu đề không được để trống" })}
            placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn..."
            className={`px-4 py-3.5 bg-muted/50 rounded-2xl border-2 h-auto transition-all ${
              errors.title
                ? "border-destructive focus-visible:ring-destructive/20"
                : "border-transparent focus-visible:ring-primary/20 focus-visible:border-primary/30"
            }`}
          />
          {titleValue && (
            <div className="absolute px-2 py-1 text-xs -translate-y-1/2 rounded-full pointer-events-none right-3 top-1/2 text-muted-foreground bg-muted">
              {titleValue.length} ký tự
            </div>
          )}
        </div>
        {errors.title && (
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-destructive bg-destructive/10 rounded-xl">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
            {errors.title.message}
          </div>
        )}
      </div>

      {/* Content Field */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-foreground">
          <FileText className="w-4 h-4 text-primary" />
          Nội dung bài viết
          <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Textarea
            {...register("content", { required: "Nội dung không được để trống" })}
            placeholder="Viết nội dung chi tiết cho bài viết của bạn..."
            rows={10}
            className={`px-4 py-3.5 bg-muted/50 rounded-2xl border-2 resize-none transition-all ${
              errors.content
                ? "border-destructive focus-visible:ring-destructive/20"
                : "border-transparent focus-visible:ring-primary/20 focus-visible:border-primary/30"
            }`}
          />
          {contentValue && (
            <div className="absolute px-2 py-1 text-xs rounded-full pointer-events-none right-3 bottom-3 text-muted-foreground bg-muted">
              {contentValue.length} ký tự
            </div>
          )}
        </div>
        {errors.content && (
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-destructive bg-destructive/10 rounded-xl">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
            {errors.content.message}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="p-4 border bg-primary/5 border-primary/20 rounded-2xl">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-primary/10 h-fit">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-foreground">Mẹo viết bài hiệu quả</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Tiêu đề ngắn gọn, súc tích và thu hút</li>
              <li>• Nội dung rõ ràng, dễ hiểu và có cấu trúc</li>
              <li>• Chia sẻ kinh nghiệm thực tế và giá trị</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="gap-2 px-6 rounded-full">
          <X className="w-4 h-4" />
          Hủy bỏ
        </Button>
        <Button type="submit" disabled={isLoading} className="gap-2 px-8 font-bold rounded-full shadow-lg hover:shadow-xl">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang đăng...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Đăng bài viết
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
