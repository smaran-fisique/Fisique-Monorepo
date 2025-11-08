import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, Eye, EyeOff, Key, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);

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

    try {
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

      // Store in database
      const { data: apiKeyData, error } = await supabase
        .from('api_keys')
        .insert({
          name: newKeyName,
          key_hash: keyHash,
          key_prefix: key.substring(0, 12) + '...',
        })
        .select()
        .single();

      if (error) throw error;

      setGeneratedKey(key);
      setNewKeyName('');
      fetchApiKeys();
      toast.success('API key generated successfully');
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
    } catch (error: any) {
      toast.error('Failed to delete API key');
      console.error('Error:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const copyEndpoint = () => {
    const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-blog-post`;
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
          Manage API keys for programmatic access to create blog posts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Endpoint</CardTitle>
          <CardDescription>Use this endpoint with your API key</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-3 bg-muted rounded text-sm">
              POST {import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-blog-post
            </code>
            <Button onClick={copyEndpoint} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Include the API key in the <code className="bg-muted px-1 py-0.5 rounded">x-api-key</code> header
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generate New API Key</CardTitle>
          <CardDescription>Create a new API key for blog post creation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="keyName">Key Name</Label>
            <Input
              id="keyName"
              placeholder="e.g., Production API Key"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <Button onClick={generateApiKey}>
            <Key className="mr-2 h-4 w-4" />
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
                ⚠️ Save this key now - it won't be shown again!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No API keys yet</p>
          ) : (
            <div className="space-y-2">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{key.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {key.key_prefix}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created: {new Date(key.created_at).toLocaleDateString()}
                      {key.last_used_at && ` • Last used: ${new Date(key.last_used_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete API Key</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure? This action cannot be undone and any applications using this key will lose access.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteApiKey(key.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
