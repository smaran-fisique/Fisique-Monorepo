import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Upload, FileText, CheckCircle } from 'lucide-react';

interface ReviewImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportComplete: () => void;
}

interface ParsedReview {
  reviewId: string;
  name: string;
  stars: number;
  text: string | null;
  publishedAtDate: string;
  publishAt: string;
  reviewerPhotoUrl: string | null;
}

export function ReviewImportModal({ open, onOpenChange, onImportComplete }: ReviewImportModalProps) {
  const [content, setContent] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count: number } | null>(null);
  const { toast } = useToast();

  const parseXmlContent = (xmlString: string): ParsedReview[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');
    const items = doc.querySelectorAll('item');
    const reviews: ParsedReview[] = [];

    items.forEach((item) => {
      const reviewId = item.querySelector('reviewId')?.textContent;
      const name = item.querySelector('name')?.textContent;
      const stars = parseInt(item.querySelector('stars')?.textContent || '0', 10);
      const text = item.querySelector('text')?.textContent || null;
      const publishedAtDate = item.querySelector('publishedAtDate')?.textContent;
      const publishAt = item.querySelector('publishAt')?.textContent || '';
      const reviewerPhotoUrl = item.querySelector('reviewerPhotoUrl')?.textContent || null;

      // Only include reviews with valid required fields
      if (reviewId && name && publishedAtDate && stars > 0) {
        reviews.push({
          reviewId,
          name,
          stars,
          text,
          publishedAtDate,
          publishAt,
          reviewerPhotoUrl,
        });
      }
    });

    return reviews;
  };

  const parseJsonContent = (jsonString: string): ParsedReview[] => {
    try {
      const data = JSON.parse(jsonString);
      const items = Array.isArray(data) ? data : data.items || [];
      return items
        .filter((item: any) => item.reviewId && item.name && item.publishedAtDate && item.stars > 0)
        .map((item: any) => ({
          reviewId: item.reviewId,
          name: item.name,
          stars: item.stars,
          text: item.text || null,
          publishedAtDate: item.publishedAtDate,
          publishAt: item.publishAt || '',
          reviewerPhotoUrl: item.reviewerPhotoUrl || null,
        }));
    } catch {
      return [];
    }
  };

  const handleImport = async () => {
    if (!content.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please paste XML or JSON content',
      });
      return;
    }

    setImporting(true);
    setResult(null);

    try {
      // Try to parse as XML first, then JSON
      let reviews: ParsedReview[] = [];
      const trimmedContent = content.trim();

      if (trimmedContent.startsWith('<?xml') || trimmedContent.startsWith('<items')) {
        reviews = parseXmlContent(trimmedContent);
      } else if (trimmedContent.startsWith('[') || trimmedContent.startsWith('{')) {
        reviews = parseJsonContent(trimmedContent);
      } else {
        // Try both
        reviews = parseXmlContent(trimmedContent);
        if (reviews.length === 0) {
          reviews = parseJsonContent(trimmedContent);
        }
      }

      if (reviews.length === 0) {
        throw new Error('No valid reviews found in the provided content');
      }

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('import-reviews-bulk', {
        body: { reviews },
      });

      if (error) throw error;

      setResult({ success: true, count: data.count });
      toast({
        title: 'Import Successful',
        description: `Imported ${data.count} reviews`,
      });

      // Trigger stats sync
      await supabase.functions.invoke('sync-review-stats');
      onImportComplete();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description: error.message || 'Failed to import reviews',
      });
      setResult(null);
    } finally {
      setImporting(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setContent(text);
    };
    reader.readAsText(file);
  };

  const handleClose = () => {
    setContent('');
    setResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import Reviews from Apify
          </DialogTitle>
          <DialogDescription>
            Paste your Apify XML or JSON export below, or upload a file. Reviews will be imported using reviewId for deduplication.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {result?.success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold">Import Complete!</h3>
              <p className="text-muted-foreground">
                Successfully imported {result.count} reviews
              </p>
              <Button onClick={handleClose} className="mt-4">
                Close
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors">
                    <FileText className="w-4 h-4" />
                    Upload File
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xml,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </Label>
                <span className="text-sm text-muted-foreground">
                  or paste content below
                </span>
              </div>

              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Paste your Apify XML or JSON export here...

Example XML:
<?xml version="1.0" encoding="UTF-8"?>
<items>
  <item>
    <reviewId>abc123</reviewId>
    <name>John Doe</name>
    <stars>5</stars>
    <text>Great gym!</text>
    <publishedAtDate>2025-01-15T10:00:00.000Z</publishedAtDate>
    <publishAt>2 weeks ago</publishAt>
  </item>
</items>'
                className="font-mono min-h-[300px] text-sm"
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleImport} disabled={importing || !content.trim()}>
                  {importing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Import Reviews
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
