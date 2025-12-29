import { Heart, Pencil, X, Save, Trash2 } from "lucide-react";

export default function CommentItem({
  comment,
  isEditing,
  editingContent,
  setEditingContent,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}) {
  return (
    <div className="flex gap-4 group">
      <img
        src={comment.avatar}
        alt={comment.author}
        className="w-10 h-10 border rounded-full shrink-0"
      />

      <div className="flex-1 space-y-2">
        <div className="bg-card border rounded-2xl px-5 py-3.5">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold">{comment.author}</span>
            <span className="text-xs text-muted-foreground">
              {comment.createdAt}
            </span>
          </div>

          {!isEditing ? (
            <p className="text-sm whitespace-pre-line">
              {comment.content}
            </p>
          ) : (
            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              className="w-full p-3 text-sm resize-none bg-muted rounded-xl focus:outline-none"
            />
          )}
        </div>

        <div className="flex items-center gap-4 ml-3 text-xs font-semibold">
          {!isEditing ? (
            <>
              <button className="flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary">
                <Heart className="w-4 h-4" />
                Thích
              </button>
              <button onClick={onEdit} className="cursor-pointer hover:text-primary">
                <Pencil className="inline w-4 h-4" /> Sửa
              </button>
              <button onClick={onDelete} className="cursor-pointer hover:text-destructive">
                <Trash2 className="inline w-4 h-4" /> Xoá
              </button>
            </>
          ) : (
            <>
              <button onClick={onCancel} className="cursor-pointer hover:text-muted-foreground">
                <X className="inline w-4 h-4" /> Huỷ
              </button>
              <button
                onClick={onSave}
                disabled={!editingContent.trim()}
                className="cursor-pointer hover:text-primary disabled:opacity-50"
              >
                <Save className="inline w-4 h-4" /> Lưu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
