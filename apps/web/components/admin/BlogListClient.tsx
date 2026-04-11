'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2, Edit, Trash2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string;
}

export function BlogListClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, status, published_at, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load blog posts',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Blog post deleted',
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete post',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No blog posts yet</p>
            <Button asChild>
              <Link href="/admin/blog/new">Create your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      post.status === 'published'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {post.status}
                    </span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Edit className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
