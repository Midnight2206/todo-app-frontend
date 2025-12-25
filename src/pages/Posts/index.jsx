import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPostForm from "@/components/AddPostForm";
import PostCard from "@/components/PostCard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { getPosts, deletePost } from "@/utils/postApi";

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };
  console.log(posts);
  
  const handlePostAdded = () => {
    fetchPosts();
    setIsAddOpen(false);
    toast.success("Post added");
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchPosts();
      toast.success("Post deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/posts/edit/${id}`);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b bg-background">
        <div className="flex items-center justify-between max-w-3xl px-4 py-4 mx-auto">
          <div>
            <h1 className="text-xl font-semibold">Posts</h1>
            <p className="text-sm text-muted-foreground">
              Manage your posts
            </p>
          </div>

          <Button onClick={() => setIsAddOpen(true)} className="gap-2">
            <Plus size={16} />
            Add Post
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl px-4 py-6 mx-auto space-y-4">
          {loading && (
            <p className="text-center text-muted-foreground">Loading posts...</p>
          )}
          {!loading && posts.length === 0 && (
            <p className="text-center text-muted-foreground">No posts found</p>
          )}
          {!loading &&
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => navigate(`/posts/${post.id}`)}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
        </div>
      </div>

      {/* Add Post Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <h2 className="mb-4 text-lg font-semibold">Add New Post</h2>
          <DialogTitle>
            <VisuallyHidden>Add New Post</VisuallyHidden>
          </DialogTitle>
          <DialogDescription>
            Please fill in the post details below.
          </DialogDescription>
          <AddPostForm
            onClose={() => setIsAddOpen(false)}
            onPostAdded={handlePostAdded}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
