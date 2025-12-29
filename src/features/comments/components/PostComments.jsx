import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useComments } from "@/features/comments/useComment";
import CommentItem from "./CommentItem";

export default function PostComments({ postId }) {
  const {
    comments,
    isLoading,
    isError,
    error,

    editingId,
    editingContent,
    setEditingContent,

    handleAdd,
    handleDelete,
    startEdit,
    cancelEdit,
    saveEdit,
  } = useComments(postId);

  const [content, setContent] = useState("");

  if (isLoading) {
    return <p className="text-muted-foreground">Đang tải bình luận...</p>;
  }

  if (isError) {
    return (
      <p className="text-destructive">
        {error?.data?.message || "Không thể tải bình luận"}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-3 text-xl font-bold">
        Bình luận
        <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
          {comments.length}
        </span>
      </h2>

      <div className="p-5 border rounded-3xl bg-card">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Chia sẻ suy nghĩ của bạn..."
          className="w-full p-4 resize-none min-h-24 bg-muted rounded-2xl"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={() => {
              handleAdd(content);
              setContent("");
            }}
            disabled={!content.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50"
          >
            Đăng bình luận <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground">
          <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
          Chưa có bình luận
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((cmt) => (
            <CommentItem
              key={cmt.id}
              comment={cmt}
              isEditing={editingId === cmt.id}
              editingContent={editingContent}
              setEditingContent={setEditingContent}
              onEdit={() => startEdit(cmt)}
              onCancel={cancelEdit}
              onSave={saveEdit}
              onDelete={() => handleDelete(cmt.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
