import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import Sidebar from "@/components/Sidebar";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import TaskDetail from "@/pages/TaskDetail";
import ByPass from "@/pages/ByPass";
import Posts from "@/pages/Posts";
import PostDetail from "@/pages/PostDetail";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-auto">
          <Toaster
            position="bottom-center"
            style={{
              "--normal-bg": "var(--foreground)",
              "--normal-text": "var(--background)",
            }}
          />

          <Routes>
            <Route index element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/bypass" element={<ByPass />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
