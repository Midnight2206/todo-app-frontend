import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { createPost } from "@/utils/postApi";

export default function AddPostForm({ onClose, onPostAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createPost(data);
      toast.success("Post created successfully");
      reset();
      onPostAdded?.();
    } catch (err) {
      console.log(err);
      toast.error("Failed to create post");
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="text-xs text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Content</label>
        <Textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Enter post content"
          rows={5}
        />
        {errors.content && (
          <p className="text-xs text-destructive mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
