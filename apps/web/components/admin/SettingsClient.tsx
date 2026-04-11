'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface SiteSetting {
  key: string;
  value: string;
  description: string | null;
}

export function SettingsClient() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load settings',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const setting of settings) {
        const { error } = await supabase
          .from('site_settings')
          .update({
            value: setting.value,
            updated_by: user?.id
          })
          .eq('key', setting.key);

        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(settings.map(s =>
      s.key === key ? { ...s, value } : s
    ));
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
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">Manage global site configuration</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key} className="capitalize">
                {setting.key.replace(/_/g, ' ')}
              </Label>
              {setting.description && (
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              )}
              <Input
                id={setting.key}
                value={setting.value}
                onChange={(e) => updateSetting(setting.key, e.target.value)}
                placeholder={`Enter ${setting.key.replace(/_/g, ' ')}`}
              />
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">AI Prompts</h2>
            <p className="text-sm text-muted-foreground">Customize the prompts used for AI-powered features</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai_enhance_prompt">Content Enhancement Prompt</Label>
            <p className="text-sm text-muted-foreground">
              Used when enhancing blog content with AI
            </p>
            <textarea
              id="ai_enhance_prompt"
              value={settings.find(s => s.key === 'ai_enhance_prompt')?.value || ''}
              onChange={(e) => updateSetting('ai_enhance_prompt', e.target.value)}
              placeholder="Enter AI enhancement prompt"
              className="w-full min-h-[200px] p-3 rounded-md border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai_format_prompt">Content Formatting Prompt</Label>
            <p className="text-sm text-muted-foreground">
              Used when formatting blog content with AI
            </p>
            <textarea
              id="ai_format_prompt"
              value={settings.find(s => s.key === 'ai_format_prompt')?.value || ''}
              onChange={(e) => updateSetting('ai_format_prompt', e.target.value)}
              placeholder="Enter AI formatting prompt"
              className="w-full min-h-[200px] p-3 rounded-md border border-border bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ai_image_prompt">Image Generation Prompt Template</Label>
            <p className="text-sm text-muted-foreground">
              Used when generating images with AI. Use {'{prompt}'} as placeholder for user input.
            </p>
            <textarea
              id="ai_image_prompt"
              value={settings.find(s => s.key === 'ai_image_prompt')?.value || ''}
              onChange={(e) => updateSetting('ai_image_prompt', e.target.value)}
              placeholder="Enter AI image generation prompt template"
              className="w-full min-h-[100px] p-3 rounded-md border border-border bg-background text-foreground"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save AI Prompts
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">API Keys</h2>
            <p className="text-sm text-muted-foreground">Manage your API integrations</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gemini-api-key">Gemini API Key</Label>
            <p className="text-sm text-muted-foreground">
              Used for AI-powered blog content enhancement
            </p>
            <Input
              id="gemini-api-key"
              type="password"
              value="••••••••••••••••"
              disabled
              placeholder="Configured in backend"
            />
            <p className="text-xs text-muted-foreground">
              To update this key, please use the backend secrets management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
