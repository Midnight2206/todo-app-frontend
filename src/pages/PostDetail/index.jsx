import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "@/features/posts/postApi";
import { toast } from "sonner";
import {
  Heart,
  MessageCircle,
  Pencil,
  X,
  MoreHorizontal,
  ArrowLeft,
  Clock,
  Save,
  Sparkles,
} from "lucide-react";
import PostContent from "./PostContent";
import PostDetailSkeleton from "./PostDetailSkeleton";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import PostComments from "@/features/comments/components/PostComments";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error,
  } = useGetPostByIdQuery(id);
  const postForm = useForm({
    defaultValues: { title: post?.title || "", content: post?.content || "" },
  });
  const {title, content} = useWatch({control: postForm.control})
  useEffect(() => {
    if (isPostError) {
      toast.error(error?.data?.message || "Không thể tải bài viết");
    }
  }, [isPostError, error]);
  useEffect(() => {
  if (post) {
    postForm.reset({
      title: post.title,
      content: post.content,
    });
  }
}, [post, postForm]);

  const [updatePost] = useUpdatePostMutation();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };
  const handleUpdatePost = async (postData) => {
  try {
    await updatePost({
      id,
      postData,
    }).unwrap();

    toast.success("Cập nhật bài viết thành công");
    setIsEditingPost(false);
  } catch (err) {
    toast.error(err?.data?.message || "Cập nhật thất bại");
  }
};
  if (isPostLoading) return <PostDetailSkeleton />;  
  if (!post)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-4 rounded-full bg-muted">
          <Sparkles className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          Không tìm thấy bài viết
        </p>
        <button
          className="px-6 py-2 font-medium transition-colors rounded-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => navigate("/posts")}
        >
          Quay lại
        </button>
      </div>
    );
  return (
    <div className="min-h-screen pb-20 bg-linear-to-b from-background via-background to-muted/20">
      <div className="sticky top-0 z-20 border-b shadow-sm bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 max-w-3xl px-4 mx-auto">
          <button
            className="flex items-center gap-2 px-3 py-2 font-medium transition-all rounded-full cursor-pointer hover:bg-accent text-foreground"
            onClick={() => navigate("/posts")}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
          <span className="text-base font-bold text-transparent bg-linear-to-r from-primary to-primary/70 bg-clip-text">
            Chi tiết bài viết
          </span>
          <button className="p-2 transition-all rounded-full hover:bg-accent">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl px-4 pt-8 pb-4 mx-auto space-y-8">
        <article className="overflow-hidden transition-all duration-300 border shadow-lg bg-card rounded-3xl hover:shadow-xl">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={post.userAvatar}
                    alt={post.user}
                    className="transition-transform border-2 rounded-full h-14 w-14 border-primary/20 ring-2 ring-background group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold leading-none hover:text-primary transition-colors cursor-pointer mb-1.5">
                    {post.user}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{post.createdAt}</span>
                    </span>
                    {post.edited && (
                      <span className="px-2 py-1 font-medium rounded-full bg-primary/10 text-primary">
                        Đã chỉnh sửa
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <FormProvider {...postForm}>
              <PostContent
                post={post}
                isEditingPost={isEditingPost}
                form={postForm}
              />
            </FormProvider>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
            <div className="flex items-center gap-1">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isLiked
                    ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                    : "text-muted-foreground hover:bg-accent"
                }`}
                onClick={handleLike}
              >
                <Heart
                  className={`h-5 w-5 transition-all ${isLiked ? "fill-current scale-110" : ""}`}
                />
                <span className="text-sm font-bold">
                  {likeCount.toLocaleString()}
                </span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 transition-all rounded-full text-muted-foreground hover:bg-accent">
                <MessageCircle className="w-5 h-5" />
                {/* <span className="text-sm font-bold">{comments?.length}</span> */}
              </button>

              {isEditingPost ? (
                <div className="flex items-center gap-6">
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsEditingPost(false)}
                  >
                    <X className="w-5 h-5" />
                    <span className="text-sm font-medium">Huỷ</span>
                  </button>
                  <Button
                    variant="ghost"
                    disabled={title === post.title && content === post.content}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleUpdatePost({title, content})}
                  >
                    <Save className="w-5 h-5" />
                    <span className="text-sm font-medium">Lưu</span>
                  </Button>
                </div>
              ) : (
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsEditingPost(true)}
                >
                  <Pencil className="w-5 h-5" />
                  <span className="text-sm font-medium">Chỉnh sửa</span>
                </button>
              )}
            </div>
          </div>
        </article>
        <PostComments postId={id}/>
      </div>
    </div>
  );
}
