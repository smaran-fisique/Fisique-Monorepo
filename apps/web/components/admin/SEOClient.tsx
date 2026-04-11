'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Search, Trash2, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface SEOMeta {
  id: string;
  page_path: string;
  title: string;
  description: string;
  keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots_directive: string;
  schema_type: string | null;
  priority: number;
  changefreq: string;
  include_in_sitemap: boolean;
}

// Common pages for quick selection
const COMMON_PAGES = [
  { path: '/', label: 'Homepage' },
  { path: '/blog', label: 'Blog' },
  { path: '/kokapet-gym', label: 'Kokapet Gym' },
  { path: '/personal-training-kokapet', label: 'Personal Training Kokapet' },
  { path: '/gym-membership-kokapet', label: 'Gym Membership Kokapet' },
  { path: '/gym-financial-district', label: 'Gym Financial District' },
  { path: '/gym-narsingi', label: 'Gym Narsingi' },
  { path: '/offers', label: 'Offers' },
  { path: '/terms', label: 'Terms' },
  { path: '/privacy', label: 'Privacy' },
  { path: '/refund', label: 'Refund' },
  { path: '/shipping', label: 'Shipping' },
];

const ROBOTS_DIRECTIVES = [
  { value: 'index, follow', label: 'Index, Follow (Default)' },
  { value: 'index, nofollow', label: 'Index, No Follow' },
  { value: 'noindex, follow', label: 'No Index, Follow' },
  { value: 'noindex, nofollow', label: 'No Index, No Follow' },
];

const CHANGEFREQ_OPTIONS = [
  { value: 'always', label: 'Always' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'never', label: 'Never' },
];

const SCHEMA_TYPES = [
  { value: '', label: 'None (Auto-detect)' },
  { value: 'Article', label: 'Article' },
  { value: 'FAQPage', label: 'FAQ Page' },
  { value: 'Service', label: 'Service' },
  { value: 'Product', label: 'Product' },
  { value: 'LocalBusiness', label: 'Local Business' },
  { value: 'WebPage', label: 'Web Page' },
];

export function SEOClient() {
  const [seoMetas, setSeoMetas] = useState<SEOMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SEOMeta | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state for live character counts
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPath, setFormPath] = useState('');
  const [formRobots, setFormRobots] = useState('index, follow');
  const [formSchemaType, setFormSchemaType] = useState('');
  const [formPriority, setFormPriority] = useState(0.5);
  const [formChangefreq, setFormChangefreq] = useState('weekly');
  const [formIncludeInSitemap, setFormIncludeInSitemap] = useState(true);

  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSEO();
  }, []);

  // Reset form when editing changes
  useEffect(() => {
    if (editing) {
      setFormTitle(editing.title);
      setFormDescription(editing.description);
      setFormPath(editing.page_path);
      setFormRobots(editing.robots_directive || 'index, follow');
      setFormSchemaType(editing.schema_type || '');
      setFormPriority(editing.priority ?? 0.5);
      setFormChangefreq(editing.changefreq || 'weekly');
      setFormIncludeInSitemap(editing.include_in_sitemap ?? true);
    } else {
      setFormTitle('');
      setFormDescription('');
      setFormPath('');
      setFormRobots('index, follow');
      setFormSchemaType('');
      setFormPriority(0.5);
      setFormChangefreq('weekly');
      setFormIncludeInSitemap(true);
    }
  }, [editing, dialogOpen]);

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
      page_path: formPath,
      title: formTitle,
      description: formDescription,
      keywords: formData.get('keywords') as string || null,
      og_image: formData.get('og_image') as string || null,
      canonical_url: formData.get('canonical_url') as string || null,
      robots_directive: formRobots,
      schema_type: formSchemaType || null,
      priority: formPriority,
      changefreq: formChangefreq,
      include_in_sitemap: formIncludeInSitemap,
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

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this SEO entry?')) return;

    try {
      const { error } = await supabase.from('seo_meta').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'SEO entry deleted' });
      fetchSEO();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const filteredMetas = seoMetas.filter(meta =>
    meta.page_path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meta.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTitleColor = (length: number) => {
    if (length === 0) return 'text-muted-foreground';
    if (length <= 60) return 'text-green-500';
    return 'text-red-500';
  };

  const getDescriptionColor = (length: number) => {
    if (length === 0) return 'text-muted-foreground';
    if (length <= 160) return 'text-green-500';
    return 'text-red-500';
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
          <p className="text-muted-foreground">Page-level SEO control for every route</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Page SEO
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? 'Edit' : 'Add'} Page SEO</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-5">
              {/* Page Path */}
              <div className="space-y-2">
                <Label htmlFor="page_path">Page Path</Label>
                <div className="flex gap-2">
                  <Input
                    id="page_path"
                    name="page_path"
                    placeholder="/your-page-path"
                    value={formPath}
                    onChange={(e) => setFormPath(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Select onValueChange={(value) => setFormPath(value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Quick select" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMON_PAGES.map((page) => (
                        <SelectItem key={page.path} value={page.path}>
                          {page.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">e.g., /blog, /kokapet-gym, /blog/post-slug</p>
              </div>

              {/* Meta Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="title">Meta Title</Label>
                  <span className={`text-xs ${getTitleColor(formTitle.length)}`}>
                    {formTitle.length}/60 characters
                  </span>
                </div>
                <Input
                  id="title"
                  name="title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
                {formTitle.length > 60 && (
                  <p className="text-xs text-red-500">Title exceeds recommended length. May be truncated in search results.</p>
                )}
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Meta Description</Label>
                  <span className={`text-xs ${getDescriptionColor(formDescription.length)}`}>
                    {formDescription.length}/160 characters
                  </span>
                </div>
                <Textarea
                  id="description"
                  name="description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  required
                  rows={3}
                />
                {formDescription.length > 160 && (
                  <p className="text-xs text-red-500">Description exceeds recommended length. May be truncated in search results.</p>
                )}
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords">Focus Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="gym kokapet, personal training, fitness hyderabad"
                  defaultValue={editing?.keywords || ''}
                />
                <p className="text-xs text-muted-foreground">Primary keywords for this page</p>
              </div>

              {/* OG Image */}
              <div className="space-y-2">
                <Label htmlFor="og_image">Social Share Image (OG Image)</Label>
                <Input
                  id="og_image"
                  name="og_image"
                  type="url"
                  placeholder="https://..."
                  defaultValue={editing?.og_image || ''}
                />
                <p className="text-xs text-muted-foreground">1200x630px recommended. Used when sharing on Facebook, LinkedIn, Twitter.</p>
              </div>

              {/* Canonical URL */}
              <div className="space-y-2">
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  name="canonical_url"
                  type="url"
                  placeholder="https://fisique.fitness/page"
                  defaultValue={editing?.canonical_url || ''}
                />
                <p className="text-xs text-muted-foreground">Use only if this page duplicates content from another URL</p>
              </div>

              {/* Live Preview */}
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground mb-3">SEARCH RESULT PREVIEW</p>
                <div className="bg-background border border-border rounded p-3">
                  <p className="text-blue-600 text-lg truncate">
                    {formTitle || 'Your Page Title Here'}
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    https://fisique.fitness{formPath || '/page'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {formDescription || 'Your meta description appears here. Make it compelling to encourage clicks.'}
                  </p>
                </div>
              </div>

              {/* Sitemap & Crawling Section */}
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-sm">Sitemap & Crawling</h3>

                {/* Robots Directive */}
                <div className="space-y-2">
                  <Label>Robots Directive</Label>
                  <Select value={formRobots} onValueChange={setFormRobots}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select robots directive" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROBOTS_DIRECTIVES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Controls how search engines index this page</p>
                </div>

                {/* Include in Sitemap */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include in Sitemap</Label>
                    <p className="text-xs text-muted-foreground">Add this page to sitemap.xml</p>
                  </div>
                  <Switch
                    checked={formIncludeInSitemap}
                    onCheckedChange={setFormIncludeInSitemap}
                  />
                </div>

                {/* Priority Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Sitemap Priority</Label>
                    <span className="text-sm font-mono">{formPriority.toFixed(1)}</span>
                  </div>
                  <Slider
                    value={[formPriority]}
                    onValueChange={([value]) => setFormPriority(value)}
                    min={0}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">1.0 = highest priority, 0.0 = lowest</p>
                </div>

                {/* Change Frequency */}
                <div className="space-y-2">
                  <Label>Change Frequency</Label>
                  <Select value={formChangefreq} onValueChange={setFormChangefreq}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select change frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CHANGEFREQ_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How often this page is likely to change</p>
                </div>

                {/* Schema Type */}
                <div className="space-y-2">
                  <Label>Page Schema Type</Label>
                  <Select value={formSchemaType} onValueChange={setFormSchemaType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-detect" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCHEMA_TYPES.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Structured data type for this page</p>
                </div>
              </div>

              <Button type="submit" className="w-full">Save SEO Settings</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* SEO Entries List */}
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {filteredMetas.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'No pages match your search' : 'No SEO entries yet'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setDialogOpen(true)}>Add your first page</Button>
            )}
          </div>
        ) : (
          filteredMetas.map((meta) => (
            <div key={meta.id} className="p-4 hover:bg-accent/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">{meta.page_path}</code>
                    <a
                      href={`https://fisique.fitness${meta.page_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="font-semibold truncate">{meta.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{meta.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className={meta.title.length <= 60 ? 'text-primary' : 'text-destructive'}>
                        Title: {meta.title.length}/60
                      </span>
                      <span className={meta.description.length <= 160 ? 'text-primary' : 'text-destructive'}>
                        Desc: {meta.description.length}/160
                      </span>
                      {meta.og_image && <span className="text-primary">✓ OG Image</span>}
                      {meta.canonical_url && <span className="text-blue-500">✓ Canonical</span>}
                      <span className={meta.include_in_sitemap ? 'text-primary' : 'text-muted-foreground'}>
                        {meta.include_in_sitemap ? '✓ Sitemap' : '✗ Sitemap'}
                      </span>
                      <span className="text-muted-foreground">
                        Priority: {meta.priority}
                      </span>
                    </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setEditing(meta); setDialogOpen(true); }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(meta.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Title Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Keep under 60 characters</li>
            <li>• Include primary keyword near the start</li>
            <li>• Make it compelling and unique</li>
            <li>• Include brand name at the end</li>
          </ul>
        </div>
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Description Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Keep under 160 characters</li>
            <li>• Include a clear call-to-action</li>
            <li>• Summarize page content accurately</li>
            <li>• Use active voice</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
