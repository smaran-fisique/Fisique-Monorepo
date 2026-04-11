'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  scopes: string[];
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

export function ApiKeysClient() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(['blog:write']);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error: any) {
      toast.error('Failed to load API keys');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    if (selectedScopes.length === 0) {
      toast.error('Please select at least one scope');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();

      // Generate a random API key
      const key = `fq_${Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')}`;

      // Hash the key for storage
      const encoder = new TextEncoder();
      const data = encoder.encode(key);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const keyPrefix = key.substring(0, 12) + '...';

      // Store in database
      const { data: newKey, error: insertError } = await supabase
        .from('api_keys')
        .insert({
          name: newKeyName,
          key_hash: keyHash,
          key_prefix: keyPrefix,
          created_by: session?.user?.id,
          scopes: selectedScopes,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setGeneratedKey(key);
      setShowKey(false);
      setNewKeyName('');
      setSelectedScopes(['blog:write']);
      toast.success('API key generated successfully');
      fetchApiKeys();
    } catch (error: any) {
      toast.error('Failed to generate API key');
      console.error('Error:', error);
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      fetchApiKeys();
      toast.success('API key deleted');
      setKeyToDelete(null);
    } catch (error: any) {
      toast.error('Failed to delete API key');
      console.error('Error:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const copyEndpoint = (functionName: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${functionName}`;
    copyToClipboard(endpoint);
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">API Keys</h1>
        <p className="text-muted-foreground">
          Manage API keys for programmatic blog post management
        </p>
      </div>

      {/* API Endpoints Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>
            Use these endpoints to manage blog posts programmatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create Blog Post Endpoint */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Create Blog Post</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-blog-post`}
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyEndpoint('create-blog-post')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm font-medium">Required Scope: <code className="text-xs">blog:write</code></p>
              <p className="text-sm font-medium">Request Headers:</p>
              <code className="text-xs block">x-api-key: YOUR_API_KEY</code>
              <code className="text-xs block">Content-Type: application/json</code>
              <p className="text-sm font-medium mt-2">Request Body Example:</p>
              <pre className="text-xs overflow-x-auto">
{`{
  "title": "Your Blog Title",
  "slug": "your-blog-slug",
  "content": "Your blog content...",
  "excerpt": "Brief description",
  "category_id": "uuid-here",
  "status": "published",
  "published_at": "2025-01-15T10:00:00Z"
}`}
              </pre>
            </div>
          </div>

          {/* Get Blog Posts Endpoint */}
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-base font-semibold">Get Blog Posts</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-blog-posts`}
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyEndpoint('get-blog-posts')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-sm font-medium">Required Scope: <code className="text-xs">blog:read</code></p>
              <p className="text-sm font-medium">Request Headers:</p>
              <code className="text-xs block">x-api-key: YOUR_API_KEY</code>
              <code className="text-xs block">Content-Type: application/json</code>
              <p className="text-sm font-medium mt-2">Request Body Example:</p>
              <pre className="text-xs overflow-x-auto">
{`{
  "date_from": "2025-01-01",
  "date_to": "2025-12-31",
  "category_id": "uuid-here",
  "limit": 50,
  "offset": 0,
  "include_content": false
}`}
              </pre>
              <p className="text-sm font-medium mt-2">Response Example:</p>
              <pre className="text-xs overflow-x-auto">
{`{
  "success": true,
  "posts": [...],
  "total": 145,
  "limit": 50,
  "offset": 0
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate New API Key */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New API Key</CardTitle>
          <CardDescription>
            Create a new API key for programmatic blog post management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyName">Key Name</Label>
            <Input
              id="keyName"
              placeholder="e.g., N8N Integration"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Permissions (Scopes)</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="scope-read"
                  checked={selectedScopes.includes('blog:read')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedScopes([...selectedScopes, 'blog:read']);
                    } else {
                      setSelectedScopes(selectedScopes.filter(s => s !== 'blog:read'));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="scope-read" className="font-normal cursor-pointer">
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">blog:read</code> - List and view blog posts
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="scope-write"
                  checked={selectedScopes.includes('blog:write')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedScopes([...selectedScopes, 'blog:write']);
                    } else {
                      setSelectedScopes(selectedScopes.filter(s => s !== 'blog:write'));
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="scope-write" className="font-normal cursor-pointer">
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">blog:write</code> - Create new blog posts
                </Label>
              </div>
            </div>
          </div>
          <Button
            onClick={generateApiKey}
            disabled={!newKeyName.trim() || selectedScopes.length === 0}
          >
            <Plus className="h-4 w-4 mr-2" />
            Generate API Key
          </Button>

          {generatedKey && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Label>Your API Key</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-2 bg-background rounded text-sm break-all">
                  {showKey ? generatedKey : '•'.repeat(generatedKey.length)}
                </code>
                <Button onClick={() => copyToClipboard(generatedKey)} variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                ⚠️ Save this key now - it won&apos;t be shown again!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>Active API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No API keys yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Scopes</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-mono">{key.name}</TableCell>
                    <TableCell className="font-mono text-sm">{key.key_prefix}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {key.scopes?.map((scope: string) => (
                          <code key={scope} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {scope}
                          </code>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(key.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {key.last_used_at
                        ? new Date(key.last_used_at).toLocaleDateString()
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setKeyToDelete(key.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!keyToDelete} onOpenChange={() => setKeyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This action cannot be undone and any applications using this key will lose access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => keyToDelete && deleteApiKey(keyToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
