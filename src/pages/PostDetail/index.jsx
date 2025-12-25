import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostById,
  getComments,
  addComment,
  updatePost,
  deleteComment,
} from "@/utils/postApi";
import PostDetailSkeleton from "./PostDetailSkeleton";
import {
  Heart,
  MessageCircle,
  Pencil,
  X,
  MoreHorizontal,
  Send,
  ArrowLeft,
  Clock,
  Save,
  Smile,
  Sparkles,
} from "lucide-react";

export default function PostDetail() {
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1200);

  const { id } = useParams();
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const post = await getPostById(id);
      setPost(post?.data?.data);
      setEditContent(post?.data?.data?.content || "");
      setEditTitle(post?.data?.data?.title || "");
      const comments = await getComments(id);
      setComments(comments?.data?.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdatePost = async () => {
    if (!editTitle.trim() && !editContent.trim()) return;
    try {
      await updatePost(id, { title: editTitle, content: editContent });
      setIsEditingPost(false);
      setEditTitle("");
      setEditContent("");
      fetchData();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleAddComment = async () => {
    if (!content.trim()) return;

    const newComment = {
      author: "Số 1 F8",
      content,
    };
    try {
      await addComment(id, newComment);
      setContent("");
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentLike = (commentId) => {
    setComments((prev) =>
      prev.map((cmt) =>
        cmt.id === commentId
          ? {
              ...cmt,
              isLiked: !cmt.isLiked,
              likes: cmt.isLiked ? cmt.likes - 1 : cmt.likes + 1,
            }
          : cmt
      )
    );
  };
  const handleDelComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      fetchData();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) return <PostDetailSkeleton />;

  if (!post)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="p-4 rounded-full bg-muted">
          <Sparkles className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          Không tìm thấy bài viết
        </p>
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
          Quay lại
        </button>
      </div>
    );
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20 pb-20">
      {/* Header với hiệu ứng glass */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b shadow-sm">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-accent transition-all font-medium text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Quay lại</span>
          </button>
          <span className="font-bold text-base bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Chi tiết bài viết
          </span>
          <button className="p-2 rounded-full hover:bg-accent transition-all">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pt-8 pb-4 space-y-8">
        {/* BÀI VIẾT CHÍNH */}
        <article className="bg-card rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Header bài viết */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={post.userAvatar}
                    alt={post.user}
                    className="h-14 w-14 rounded-full border-2 border-primary/20 ring-2 ring-background transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold leading-none hover:text-primary transition-colors cursor-pointer mb-1.5">
                    {post.user}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{post.createdAt}</span>
                    </span>
                    {post.edited && (
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        Đã chỉnh sửa
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="space-y-5">
              {/* TITLE */}
              {!isEditingPost ? (
                post.title ? (
                  <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                    {post.title}
                  </h1>
                ) : null
              ) : (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Nhập tiêu đề bài viết (không bắt buộc)"
                  className="
        w-full text-2xl md:text-3xl font-extrabold
        bg-muted/40 rounded-xl px-4 py-3
        focus:outline-none focus:ring-2 focus:ring-primary/30
      "
                />
              )}

              {/* CONTENT */}
              {!isEditingPost ? (
                <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
                  {post.content}
                </p>
              ) : (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Nội dung bài viết..."
                  className="
                      w-full min-h-40
                      bg-muted/40 rounded-2xl p-4
                      text-base leading-relaxed
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                      resize-none"
                />
              )}
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

          {/* Action buttons */}
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
              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-muted-foreground hover:bg-accent transition-all">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-bold">{comments?.length}</span>
              </button>

              {isEditingPost ? (
                <div className="flex items-center gap-6">
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsEditingPost(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="text-sm font-medium">Huỷ</span>
                  </button>
                  <button
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleUpdatePost()}
                  >
                    <Save className="h-5 w-5" />
                    <span className="text-sm font-medium">Lưu</span>
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsEditingPost(true)}
                >
                  <Pencil className="h-5 w-5" />
                  <span className="text-sm font-medium">Chỉnh sửa</span>
                </button>
              )}
            </div>
          </div>
        </article>

        {/* KHU VỰC BÌNH LUẬN */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
              Bình luận
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {comments.length}
              </span>
            </h2>
          </div>

          {/* Ô nhập bình luận */}
          <div className="bg-card border rounded-3xl p-5 shadow-md hover:shadow-lg transition-all">
            <div className="flex gap-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="Your avatar"
                className="h-10 w-10 rounded-full border-2 border-primary/20 ring-2 ring-background shrink-0"
              />
              <div className="flex-1 space-y-4">
                <textarea
                  placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-24 bg-muted/50 rounded-2xl p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none border-0"
                />
                <div className="flex justify-between items-center">
                  <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-all">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleAddComment}
                    disabled={!content.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Đăng bình luận
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách bình luận */}
          {comments.length > 0 ? (
            <div className="space-y-5 pt-2">
              {comments.map((cmt) => (
                <div key={cmt.id} className="flex gap-4 group">
                  <img
                    src={cmt.avatar}
                    alt={cmt.user}
                    className="h-10 w-10 shrink-0 rounded-full border-2 border-muted ring-2 ring-background transition-transform group-hover:scale-105"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="bg-card border rounded-2xl rounded-tl-sm px-5 py-3.5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                          {cmt.author}
                        </span>
                        <span className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium bg-muted/50 px-2 py-0.5 rounded-full">
                          {cmt.createdAt}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {cmt.content}
                      </p>
                    </div>
                    <div className="flex gap-5 ml-3 items-center">
                      <button
                        className={`text-xs font-bold transition-all flex items-center gap-1.5 ${
                          cmt.isLiked
                            ? "text-red-500 hover:text-red-600"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        onClick={() => handleCommentLike(cmt.id)}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${cmt.isLiked ? "fill-current" : ""}`}
                        />
                        Thích {cmt.likes > 0 && `(${cmt.likes})`}
                      </button>
                      <button className="cursor-pointer text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                        Phản hồi
                      </button>
                      <button
                        onClick={() => handleDelComment(cmt?.id)}
                        className="cursor-pointer text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                      >
                        Xoá
                      </button>
                      <button className="cursor-pointer text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                        Sửa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">Chưa có bình luận nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
