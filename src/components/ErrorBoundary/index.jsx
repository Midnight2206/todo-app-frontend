import { Component } from "react";
import { toast } from "sonner";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Cập nhật state để render fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Bạn có thể log ra server ở đây
    console.error("ErrorBoundary caught an error:", error, info);
    toast.error("Something went wrong!");
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-bold">Something went wrong.</h2>
            <p className="text-muted-foreground">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
