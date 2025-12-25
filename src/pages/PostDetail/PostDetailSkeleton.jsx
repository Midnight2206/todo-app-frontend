export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b">
        <div className="mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <div className="h-9 w-24 bg-muted rounded-full animate-pulse" />
          <div className="h-5 w-32 bg-muted rounded-full animate-pulse" />
          <div className="h-9 w-9 bg-muted rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="mx-auto max-w-3xl px-4 pt-8 space-y-8">
        <div className="bg-card rounded-3xl border shadow-lg p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-muted rounded-full animate-pulse" />
            <div className="space-y-2.5">
              <div className="h-5 w-36 bg-muted rounded-full animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded-full animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-3/4 bg-muted rounded-lg animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="h-7 w-32 bg-muted rounded-full animate-pulse" />
          <div className="bg-card border rounded-3xl p-5">
            <div className="flex gap-4">
              <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
              <div className="h-24 flex-1 bg-muted rounded-2xl animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="h-24 w-full bg-muted rounded-2xl animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}