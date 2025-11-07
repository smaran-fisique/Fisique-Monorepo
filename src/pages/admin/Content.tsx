import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Section {
  id: string;
  section_key: string;
  title: string | null;
  content: any;
}

export default function Content() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSections();
  }, []);

  // Initialize content when sections are loaded
  useEffect(() => {
    if (sections.length > 0) {
      const contentMap: Record<string, string> = {};
      ['hero', 'why', 'programs', 'experience', 'transformations', 'pricing', 'reviews', 'cta'].forEach((key) => {
        const section = sections.find(s => s.section_key === key);
        contentMap[key] = JSON.stringify(section?.content || {}, null, 2);
      });
      setEditedContent(contentMap);
    }
  }, [sections]);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('section_key');

      if (error) throw error;
      setSections(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load sections',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (sectionKey: string, content: any) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('sections')
        .upsert({
          section_key: sectionKey,
          content,
          updated_by: user?.id,
        }, {
          onConflict: 'section_key'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Section updated successfully',
      });

      fetchSections();
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
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">Manage homepage sections and content</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <Tabs defaultValue="hero">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="why">Why</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="transformations">Stories</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="cta">Final CTA</TabsTrigger>
          </TabsList>

          {['hero', 'why', 'programs', 'experience', 'transformations', 'pricing', 'reviews', 'cta'].map((key) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold capitalize">{key} Section</h3>
                <p className="text-sm text-muted-foreground">
                  Edit the content for the {key} section. Content is stored as JSON.
                </p>
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder={`Enter JSON content for ${key} section`}
                  className="font-mono text-sm min-h-[300px]"
                  value={editedContent[key] || '{}'}
                  onChange={(e) => setEditedContent(prev => ({ ...prev, [key]: e.target.value }))}
                />

                <Button
                  onClick={() => {
                    try {
                      const content = JSON.parse(editedContent[key] || '{}');
                      handleSave(key, content);
                    } catch (error) {
                      toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Invalid JSON format',
                      });
                    }
                  }}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
