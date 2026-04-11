'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Copy, Trash2, Image as ImageIcon } from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  storage_path: string;
  file_type: string;
  created_at: string;
}

export function MediaClient() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load media',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public-media')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('media')
        .insert({
          filename: file.name,
          storage_path: publicUrl,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });

      fetchMedia();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied!',
      description: 'URL copied to clipboard',
    });
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Delete this file?')) return;

    try {
      const fileName = path.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('public-media')
          .remove([fileName]);

        if (storageError) throw storageError;
      }

      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast({
        title: 'Success',
        description: 'File deleted',
      });

      fetchMedia();
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
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and files</p>
        </div>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <Button asChild disabled={uploading}>
            <label htmlFor="file-upload" className="cursor-pointer">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </>
              )}
            </label>
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No media files yet</p>
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Upload your first file
            </label>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="bg-card border border-border rounded-lg overflow-hidden group">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {file.file_type.startsWith('image/') ? (
                  <img
                    src={file.storage_path}
                    alt={file.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate mb-2">{file.filename}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => copyToClipboard(file.storage_path)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy URL
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(file.id, file.storage_path)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
