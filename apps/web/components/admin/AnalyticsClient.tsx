'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Loader2, TrendingUp, Users, Eye, MousePointerClick } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function AnalyticsClient() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    pageViews: 0,
    uniqueVisitors: 0,
    clicks: 0,
  });
  const { settings } = useSiteSettings();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*');

      if (error) throw error;

      const pageViews = data?.filter(e => e.event_name === 'page_view').length || 0;
      const clicks = data?.filter(e => e.event_name === 'button_click').length || 0;
      const sessions = new Set(data?.map(e => e.session_id)).size || 0;

      setStats({
        totalEvents: data?.length || 0,
        pageViews,
        uniqueVisitors: sessions,
        clicks,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
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
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your website performance</p>
      </div>

      {settings.ga4_measurement_id ? (
        <Card className="p-4 bg-green-500/10 border-green-500/20">
          <p className="text-sm">
            ✅ Google Analytics 4 is configured: {settings.ga4_measurement_id}
          </p>
        </Card>
      ) : (
        <Card className="p-4 bg-yellow-500/10 border-yellow-500/20">
          <p className="text-sm">
            ⚠️ Google Analytics 4 not configured. Add your GA4 Measurement ID in Settings.
          </p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Events</h3>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">{stats.totalEvents}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Page Views</h3>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">{stats.pageViews}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Sessions</h3>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">{stats.uniqueVisitors}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Button Clicks</h3>
            <MousePointerClick className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">{stats.clicks}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">About Analytics</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong>Internal Analytics:</strong> Basic event tracking is built-in and stored in your database.
          </p>
          <p>
            <strong>Google Analytics 4:</strong> For comprehensive analytics, add your GA4 Measurement ID in Settings.
            This will enable detailed tracking of user behavior, traffic sources, conversions, and more.
          </p>
          <p>
            Get your GA4 Measurement ID from Google Analytics → Admin → Data Streams → Your Web Stream.
          </p>
        </div>
      </Card>
    </div>
  );
}
