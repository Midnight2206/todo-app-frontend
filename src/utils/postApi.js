const API_URL = "http://localhost:3000/api/posts";

export async function getPosts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return { data };
}
export async function getPostById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return { data };
}
export async function createPost(postData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) throw new Error("Failed to create post");
  return await res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete post");
  return await res.json();
}
export async function updatePost(id, postData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) throw new Error("Failed to update post");
  return await res.json();
}

export async function getComments(postId) {
  const res = await fetch(`${API_URL}/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  const data = await res.json();
  return { data };
}

export async function addComment(postId, commentData) {
  const res = await fetch(`${API_URL}/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!res.ok) throw new Error("Failed to add comment");
  return await res.json();
}
export async function updateComment(postId, commentId, content) {
  const res = await fetch(`${API_URL}/${postId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Failed to update comment");
  return await res.json();
}
export async function deleteComment(postId, commentId) {
  const res = await fetch(`${API_URL}/${postId}/comments/${commentId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return await res.json();
}