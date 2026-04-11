'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewImportModal } from '@/components/admin/ReviewImportModal';
import {
  Loader2,
  RefreshCw,
  Save,
  FileText,
  Bot,
  Map,
  ExternalLink,
  CheckCircle,
  Clock,
  Upload
} from 'lucide-react';

interface SiteFile {
  file_key: string;
  content: string;
  auto_generate: boolean;
  last_generated: string | null;
  updated_at: string | null;
}

interface SitemapEntry {
  page_path: string;
  title: string;
  include_in_sitemap: boolean;
  priority: number;
  changefreq: string;
}

export function GlobalSEOClient() {
  const [files, setFiles] = useState<Record<string, SiteFile>>({});
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState<string | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch site files
      const { data: filesData, error: filesError } = await supabase
        .from('site_files')
        .select('*');

      if (filesError) throw filesError;

      const filesMap = (filesData || []).reduce((acc, file) => {
        acc[file.file_key] = file;
        return acc;
      }, {} as Record<string, SiteFile>);
      setFiles(filesMap);

      // Fetch sitemap entries from seo_meta
      const { data: seoData, error: seoError } = await supabase
        .from('seo_meta')
        .select('page_path, title, include_in_sitemap, priority, changefreq')
        .order('page_path');

      if (seoError) throw seoError;
      setSitemapEntries(seoData || []);
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

  const handleSaveFile = async (fileKey: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_files')
        .update({
          content: files[fileKey]?.content || '',
          auto_generate: files[fileKey]?.auto_generate || false,
          updated_at: new Date().toISOString(),
        })
        .eq('file_key', fileKey);

      if (error) throw error;

      toast({
        title: 'Saved',
        description: `${fileKey.replace('_', '.')} updated successfully`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = async (type: 'sitemap' | 'llms' | 'reviews') => {
    setRegenerating(type);
    try {
      const functionName = type === 'sitemap'
        ? 'generate-sitemap'
        : type === 'llms'
          ? 'generate-llms-txt'
          : 'sync-review-stats';

      const { data, error } = await supabase.functions.invoke(functionName);

      if (error) throw error;

      toast({
        title: 'Success',
        description: data?.message || `${type} regenerated successfully`,
      });

      // Refresh data
      await fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to regenerate',
      });
    } finally {
      setRegenerating(null);
    }
  };

  const toggleSitemapEntry = async (pagePath: string, include: boolean) => {
    try {
      const { error } = await supabase
        .from('seo_meta')
        .update({ include_in_sitemap: include })
        .eq('page_path', pagePath);

      if (error) throw error;

      setSitemapEntries(prev =>
        prev.map(entry =>
          entry.page_path === pagePath
            ? { ...entry, include_in_sitemap: include }
            : entry
        )
      );

      toast({
        title: 'Updated',
        description: `${pagePath} ${include ? 'added to' : 'removed from'} sitemap`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const updateFileContent = (fileKey: string, content: string) => {
    setFiles(prev => ({
      ...prev,
      [fileKey]: { ...prev[fileKey], content },
    }));
  };

  const updateAutoGenerate = (fileKey: string, autoGenerate: boolean) => {
    setFiles(prev => ({
      ...prev,
      [fileKey]: { ...prev[fileKey], auto_generate: autoGenerate },
    }));
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleString();
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
      <div>
        <h1 className="text-3xl font-bold">Global SEO Settings</h1>
        <p className="text-muted-foreground">Manage robots.txt, llms.txt, and sitemap configuration</p>
      </div>

      <Tabs defaultValue="sitemap" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="sitemap" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Sitemap
          </TabsTrigger>
          <TabsTrigger value="robots" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Robots.txt
          </TabsTrigger>
          <TabsTrigger value="llms" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            LLMs.txt
          </TabsTrigger>
          <TabsTrigger value="llms-full" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            LLMs Full
          </TabsTrigger>
        </TabsList>

        {/* Sitemap Tab */}
        <TabsContent value="sitemap" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Sitemap Manager</h2>
              <p className="text-sm text-muted-foreground">
                Last generated: {formatDate(files['sitemap_xml']?.last_generated)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleRegenerate('sitemap')}
                disabled={regenerating === 'sitemap'}
              >
                {regenerating === 'sitemap' ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Regenerate Now
              </Button>
              <a
                href="https://fisique.fitness/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {sitemapEntries.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No pages configured. Add pages in the SEO Management section.
              </div>
            ) : (
              sitemapEntries.map((entry) => (
                <div key={entry.page_path} className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {entry.page_path}
                    </code>
                    <p className="text-sm text-muted-foreground mt-1">{entry.title}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                      <span>Priority: {entry.priority}</span>
                      <span>Changefreq: {entry.changefreq}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.include_in_sitemap ? (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={entry.include_in_sitemap}
                      onCheckedChange={(checked) => toggleSitemapEntry(entry.page_path, checked)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground">
            <p><strong>Note:</strong> Published blog posts are automatically included in the sitemap.</p>
            <p className="mt-1">Sitemap is auto-regenerated every 6 hours via cron job.</p>
          </div>
        </TabsContent>

        {/* Robots.txt Tab */}
        <TabsContent value="robots" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Robots.txt Editor</h2>
              <p className="text-sm text-muted-foreground">
                Control how search engines crawl your site
              </p>
            </div>
            <a
              href="https://fisique.fitness/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live
              </Button>
            </a>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                id="robots-auto"
                checked={files['robots_txt']?.auto_generate || false}
                onCheckedChange={(checked) => updateAutoGenerate('robots_txt', checked)}
              />
              <Label htmlFor="robots-auto">Auto-generate (not recommended for robots.txt)</Label>
            </div>

            <Textarea
              value={files['robots_txt']?.content || ''}
              onChange={(e) => updateFileContent('robots_txt', e.target.value)}
              placeholder="User-agent: *&#10;Allow: /"
              className="font-mono min-h-[400px]"
            />

            <Button onClick={() => handleSaveFile('robots_txt')} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Robots.txt
            </Button>
          </div>
        </TabsContent>

        {/* LLMs.txt Tab */}
        <TabsContent value="llms" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">LLMs.txt (Concise)</h2>
              <p className="text-sm text-muted-foreground">
                Quick reference for AI assistants • Last generated: {formatDate(files['llms_txt']?.last_generated)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleRegenerate('llms')}
                disabled={regenerating === 'llms'}
              >
                {regenerating === 'llms' ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Regenerate
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                id="llms-auto"
                checked={files['llms_txt']?.auto_generate ?? true}
                onCheckedChange={(checked) => updateAutoGenerate('llms_txt', checked)}
              />
              <Label htmlFor="llms-auto">Auto-generate daily from database</Label>
            </div>

            <Textarea
              value={files['llms_txt']?.content || ''}
              onChange={(e) => updateFileContent('llms_txt', e.target.value)}
              placeholder="# Your Business Name&#10;&#10;Quick facts for AI assistants..."
              className="font-mono min-h-[400px]"
              disabled={files['llms_txt']?.auto_generate}
            />

            <Button
              onClick={() => handleSaveFile('llms_txt')}
              disabled={saving || files['llms_txt']?.auto_generate}
            >
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save LLMs.txt
            </Button>

            {files['llms_txt']?.auto_generate && (
              <p className="text-sm text-muted-foreground">
                Disable auto-generate to edit manually.
              </p>
            )}
          </div>
        </TabsContent>

        {/* LLMs Full Tab */}
        <TabsContent value="llms-full" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">LLMs-Full.txt (Comprehensive)</h2>
              <p className="text-sm text-muted-foreground">
                Detailed context for AI assistants • Last generated: {formatDate(files['llms_full_txt']?.last_generated)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setImportModalOpen(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import from Apify
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRegenerate('reviews')}
                disabled={regenerating === 'reviews'}
              >
                {regenerating === 'reviews' ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Sync Reviews
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRegenerate('llms')}
                disabled={regenerating === 'llms'}
              >
                {regenerating === 'llms' ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Regenerate
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Switch
                id="llms-full-auto"
                checked={files['llms_full_txt']?.auto_generate ?? true}
                onCheckedChange={(checked) => updateAutoGenerate('llms_full_txt', checked)}
              />
              <Label htmlFor="llms-full-auto">Auto-generate daily from database</Label>
            </div>

            <Textarea
              value={files['llms_full_txt']?.content || ''}
              onChange={(e) => updateFileContent('llms_full_txt', e.target.value)}
              placeholder="# Complete Business Guide&#10;&#10;Comprehensive information..."
              className="font-mono min-h-[500px]"
              disabled={files['llms_full_txt']?.auto_generate}
            />

            <Button
              onClick={() => handleSaveFile('llms_full_txt')}
              disabled={saving || files['llms_full_txt']?.auto_generate}
            >
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save LLMs-Full.txt
            </Button>

            {files['llms_full_txt']?.auto_generate && (
              <p className="text-sm text-muted-foreground">
                Disable auto-generate to edit manually.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <ReviewImportModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        onImportComplete={fetchData}
      />
    </div>
  );
}
