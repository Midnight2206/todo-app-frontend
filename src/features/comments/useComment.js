import { useState } from "react";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "./commentsApi";
import { toast } from "sonner";

export function useComments(postId) {
  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useGetCommentsQuery(postId);

  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const handleAdd = async (content) => {
    try {
      await addComment({ postId, commentData: {content, author: "ABC"}  }).unwrap();
      toast.success("Đã thêm bình luận");
    } catch (err) {
      toast.error(err?.data?.message || "Thêm bình luận thất bại");
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const saveEdit = async () => {
    try {
      await updateComment({
        postId,
        commentId: editingId,
        content: editingContent,
      }).unwrap();

      toast.success("Đã cập nhật bình luận");
      cancelEdit();
    } catch (err) {
      toast.error(err?.data?.message || "Cập nhật thất bại");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComment({postId, commentId: id}).unwrap();
      toast.success("Đã xoá bình luận");
    } catch (err) {
      toast.error(err?.data?.message || "Xoá bình luận thất bại");
    }
  };

  return {
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
  };
}
