import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.email}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Blog Posts</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Active Offers</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Page Views (7d)</h3>
          <p className="text-2xl font-bold mt-2">-</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Media Files</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <button className="text-left p-4 border border-border rounded-lg hover:bg-accent transition-colors">
            <h3 className="font-medium mb-1">Create Blog Post</h3>
            <p className="text-sm text-muted-foreground">Write and publish new content</p>
          </button>
          
          <button className="text-left p-4 border border-border rounded-lg hover:bg-accent transition-colors">
            <h3 className="font-medium mb-1">Add New Offer</h3>
            <p className="text-sm text-muted-foreground">Create promotional banners</p>
          </button>
          
          <button className="text-left p-4 border border-border rounded-lg hover:bg-accent transition-colors">
            <h3 className="font-medium mb-1">Upload Media</h3>
            <p className="text-sm text-muted-foreground">Add images and files</p>
          </button>
        </div>
      </div>
    </div>
  );
}
