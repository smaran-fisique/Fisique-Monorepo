import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Loader2, ArrowLeft, Sparkles, Wand2, Upload, ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Category {
  id: string;
  name: string;
}

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [formatting, setFormatting] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showAIInput, setShowAIInput] = useState(false);
  const [pastedContent, setPastedContent] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('blog_categories')
      .select('id, name')
      .order('name');
    setCategories(data || []);
  };

  const fetchPost = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt || '');
      setContent(data.content);
      setCategoryId(data.category_id || '');
      setFeaturedImageUrl(data.featured_image_url || '');
      setStatus(data.status as 'draft' | 'published');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load post',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!id) {
      setSlug(generateSlug(value));
    }
  };

  const handleFormatContent = async () => {
    if (!content.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No content to format',
      });
      return;
    }

    setFormatting(true);
    try {
      console.log('Original content length:', content.length);
      
      const { data, error } = await supabase.functions.invoke('format-blog-content', {
        body: { content }
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          variant: 'destructive',
          title: 'Formatting Failed',
          description: data.error,
        });
        return;
      }

      if (data?.formattedContent) {
        console.log('Formatted content length:', data.formattedContent.length);
        console.log('Content changed:', content !== data.formattedContent);
        
        // Force a unique update by temporarily clearing content
        setContent('');
        setTimeout(() => {
          setContent(data.formattedContent);
        }, 0);
        
        toast({
          title: 'Success',
          description: 'Content formatted successfully!',
        });
      }
    } catch (error: any) {
      console.error('Format error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to format content',
      });
    } finally {
      setFormatting(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter an image prompt',
      });
      return;
    }

    setGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { prompt: imagePrompt }
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: data.error,
        });
        return;
      }

      if (data?.imageUrl) {
        // Upload the base64 image to storage
        const base64Data = data.imageUrl.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        
        const fileName = `blog-${Date.now()}.png`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('public-media')
          .upload(`blog-images/${fileName}`, blob, {
            contentType: 'image/png',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('public-media')
          .getPublicUrl(`blog-images/${fileName}`);

        setFeaturedImageUrl(publicUrl);
        setImagePrompt('');
        
        toast({
          title: 'Success',
          description: 'Image generated and uploaded successfully!',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate image',
      });
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please upload an image file',
      });
      return;
    }

    setUploadingImage(true);
    try {
      const fileName = `blog-${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('public-media')
        .upload(`blog-images/${fileName}`, file, {
          contentType: file.type,
          upsert: false
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('public-media')
        .getPublicUrl(`blog-images/${fileName}`);

      setFeaturedImageUrl(publicUrl);
      
      toast({
        title: 'Success',
        description: 'Image uploaded successfully!',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to upload image',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEnhanceContent = async () => {
    if (!pastedContent.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please paste some content first',
      });
      return;
    }

    setEnhancing(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhance-blog-content', {
        body: { content: pastedContent }
      });

      if (error) {
        // Check if it's a rate limit error
        if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
          toast({
            variant: 'destructive',
            title: 'Gemini API Quota Exceeded',
            description: 'Your Gemini API key has exceeded its quota. Please check your billing at ai.google.dev or wait for quota to reset.',
            duration: 8000,
          });
        } else {
          throw error;
        }
        return;
      }

      if (data?.error) {
        toast({
          variant: 'destructive',
          title: 'Enhancement Failed',
          description: data.error,
          duration: 8000,
        });
        return;
      }

      if (data) {
        setTitle(data.title || '');
        setSlug(data.slug || generateSlug(data.title || ''));
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        
        // Find category by name
        if (data.suggestedCategory) {
          const foundCategory = categories.find(
            cat => cat.name.toLowerCase() === data.suggestedCategory.toLowerCase()
          );
          if (foundCategory) {
            setCategoryId(foundCategory.id);
          }
        }

        // Set featured image prompt suggestion
        if (data.featuredImagePrompt) {
          setImagePrompt(data.featuredImagePrompt);
        }

        setShowAIInput(false);
        setPastedContent('');

        toast({
          title: 'Success',
          description: 'Content enhanced! Review and adjust as needed.',
        });
      }
    } catch (error: any) {
      console.error('Enhancement error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to enhance content',
      });
    } finally {
      setEnhancing(false);
    }
  };

  const handleSave = async () => {
    if (!title || !content || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Title and content are required',
      });
      return;
    }

    setLoading(true);
    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        category_id: categoryId || null,
        featured_image_url: featuredImageUrl || null,
        status,
        author_id: user.id,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };

      if (id) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(postData);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Post ${id ? 'updated' : 'created'} successfully`,
      });

      navigate('/admin/blog');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save post',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">{id ? 'Edit' : 'New'} Blog Post</h1>
        </div>
        {!id && (
          <Button
            variant="outline"
            onClick={() => setShowAIInput(!showAIInput)}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Enhance
          </Button>
        )}
      </div>

      {showAIInput && (
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-primary/20 rounded-lg p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-1" />
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">AI Content Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Paste your existing blog content below and let AI enhance it, generate SEO-friendly metadata, and fill in all required fields automatically.
                </p>
              </div>
              <Textarea
                value={pastedContent}
                onChange={(e) => setPastedContent(e.target.value)}
                placeholder="Paste your raw blog content here... (can be bullet points, rough draft, or existing article)"
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handleEnhanceContent} 
                  disabled={enhancing || !pastedContent.trim()}
                  className="gap-2"
                >
                  {enhancing && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Sparkles className="w-4 h-4" />
                  Enhance with AI
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setShowAIInput(false);
                    setPastedContent('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-url-slug"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description for preview"
          />
        </div>

        <div className="space-y-2">
          <Label>Featured Image</Label>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="generate">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generate
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-3">
              <div className="flex items-center gap-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="flex-1"
                />
                {uploadingImage && <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
              {featuredImageUrl && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                  <img src={featuredImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="generate" className="space-y-3">
              <div className="space-y-2">
                <Textarea
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="min-h-[100px]"
                  disabled={generatingImage}
                />
                <Button 
                  onClick={handleGenerateImage} 
                  disabled={generatingImage || !imagePrompt.trim()}
                  className="w-full gap-2"
                >
                  {generatingImage && <Loader2 className="w-4 h-4 animate-spin" />}
                  <ImageIcon className="w-4 h-4" />
                  Generate Image with AI
                </Button>
              </div>
              {featuredImageUrl && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                  <img src={featuredImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Content</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleFormatContent}
              disabled={formatting || !content.trim()}
              className="gap-2"
            >
              {formatting && <Loader2 className="w-4 h-4 animate-spin" />}
              <Wand2 className="w-4 h-4" />
              Magic Format
            </Button>
          </div>
          <RichTextEditor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/blog')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {id ? 'Update' : 'Create'} Post
          </Button>
        </div>
      </div>
    </div>
  );
}
