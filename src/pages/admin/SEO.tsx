import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SEOMeta {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
}

export default function SEO() {
  const [seoMetas, setSeoMetas] = useState<SEOMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SEOMeta | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSEO();
  }, []);

  const fetchSEO = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_meta')
        .select('*')
        .order('page_path');

      if (error) throw error;
      setSeoMetas(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load SEO data',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const seoData = {
      page_path: formData.get('page_path') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      keywords: formData.get('keywords') as string || null,
      og_image: formData.get('og_image') as string || null,
      canonical_url: formData.get('canonical_url') as string || null,
      updated_by: user?.id,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from('seo_meta')
          .update(seoData)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('seo_meta')
          .insert(seoData);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `SEO meta ${editing ? 'updated' : 'created'}`,
      });

      setDialogOpen(false);
      setEditing(null);
      fetchSEO();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
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
          <h1 className="text-3xl font-bold">SEO Management</h1>
          <p className="text-muted-foreground">Optimize your pages for search engines</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add SEO Meta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit' : 'Add'} SEO Meta</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page_path">Page Path</Label>
                <Input 
                  id="page_path" 
                  name="page_path" 
                  placeholder="/about" 
                  defaultValue={editing?.page_path}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Meta Title (max 60 chars)</Label>
                <Input 
                  id="title" 
                  name="title" 
                  maxLength={60}
                  defaultValue={editing?.title}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Meta Description (max 160 chars)</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  maxLength={160}
                  defaultValue={editing?.description}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input 
                  id="keywords" 
                  name="keywords" 
                  placeholder="fitness, gym, training"
                  defaultValue={editing?.keywords || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input 
                  id="og_image" 
                  name="og_image" 
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={editing?.og_image || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input 
                  id="canonical_url" 
                  name="canonical_url" 
                  type="url"
                  placeholder="https://fisique.fitness/page"
                  defaultValue={editing?.canonical_url || ''}
                />
              </div>
              <Button type="submit" className="w-full">Save SEO Meta</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {seoMetas.map((meta) => (
          <div key={meta.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-mono text-sm font-medium">{meta.page_path}</h3>
                <p className="text-lg font-semibold mt-1">{meta.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{meta.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setEditing(meta); setDialogOpen(true); }}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
            {meta.keywords && (
              <p className="text-xs text-muted-foreground mt-2">
                Keywords: {meta.keywords}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Search className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">SEO Preview</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Your pages will appear like this in search results. Keep titles under 60 characters and descriptions under 160 characters for best results.
            </p>
            <div className="bg-background border border-border rounded p-3">
              <p className="text-blue-600 text-lg">Your Page Title Here</p>
              <p className="text-green-700 text-xs mt-1">https://fisique.fitness/page</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your meta description appears here. Make it compelling to encourage clicks from search results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
