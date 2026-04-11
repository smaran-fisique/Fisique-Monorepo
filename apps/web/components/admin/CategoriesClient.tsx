'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2, Edit, Trash2, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTag, setEditingTag] = useState<BlogTag | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        supabase.from('blog_categories').select('*').order('name'),
        supabase.from('blog_tags').select('*').order('name'),
      ]);

      setCategories(categoriesRes.data || []);
      setTags(tagsRes.data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load data',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSaveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const slug = generateSlug(name);

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('blog_categories')
          .update({ name, slug, description })
          .eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_categories')
          .insert({ name, slug, description });
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Category ${editingCategory ? 'updated' : 'created'}`,
      });

      setDialogOpen(false);
      setEditingCategory(null);
      fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleSaveTag = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('tagName') as string;
    const slug = generateSlug(name);

    try {
      if (editingTag) {
        const { error } = await supabase
          .from('blog_tags')
          .update({ name, slug })
          .eq('id', editingTag.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_tags')
          .insert({ name, slug });
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Tag ${editingTag ? 'updated' : 'created'}`,
      });

      setTagDialogOpen(false);
      setEditingTag(null);
      fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;

    try {
      const { error } = await supabase.from('blog_categories').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Category deleted' });
      fetchData();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Delete this tag?')) return;

    try {
      const { error } = await supabase.from('blog_tags').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Tag deleted' });
      fetchData();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Categories & Tags</h1>
        <p className="text-muted-foreground">Organize your blog content</p>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="w-4 h-4 mr-2" />
                New Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? 'Edit' : 'New'} Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" defaultValue={editingCategory?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingCategory?.description || ''} />
                </div>
                <Button type="submit" className="w-full">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {categories.map((cat) => (
            <div key={cat.id} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{cat.name}</h3>
                {cat.description && <p className="text-sm text-muted-foreground">{cat.description}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditingCategory(cat); setDialogOpen(true); }}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(cat.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tags</h2>
          <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTag(null)}>
                <Tag className="w-4 h-4 mr-2" />
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTag ? 'Edit' : 'New'} Tag</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveTag} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tagName">Name</Label>
                  <Input id="tagName" name="tagName" defaultValue={editingTag?.name} required />
                </div>
                <Button type="submit" className="w-full">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
              <span>{tag.name}</span>
              <button onClick={() => { setEditingTag(tag); setTagDialogOpen(true); }} className="hover:text-primary">
                <Edit className="w-3 h-3" />
              </button>
              <button onClick={() => handleDeleteTag(tag.id)} className="hover:text-destructive">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
