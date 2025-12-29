import { useFormContext } from "react-hook-form";
export default function PostContent({ post, isEditingPost }) {
  const { register } = useFormContext();

  return (
    <div className="space-y-5">
      {!isEditingPost ? (
        post.title ? (
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl text-foreground">
            {post.title}
          </h1>
        ) : null
      ) : (
        <input
          {...register("title")}
          placeholder="Nhập tiêu đề bài viết (không bắt buộc)"
          className="w-full px-4 py-3 text-2xl font-extrabold md:text-3xl bg-muted/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      )}

      {!isEditingPost ? (
        <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
          {post.content}
        </p>
      ) : (
        <textarea
          {...register("content")}
          placeholder="Nội dung bài viết..."
          className="w-full p-4 text-base leading-relaxed resize-none min-h-40 bg-muted/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      )}
    </div>
  );
}
