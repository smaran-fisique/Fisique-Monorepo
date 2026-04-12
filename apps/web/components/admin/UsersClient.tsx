'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield } from 'lucide-react';

interface UserProfile {
  id: string;
  role: string;
  full_name: string | null;
}

export function UsersClient() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .schema('public')
        .from('profiles')
        .select('id, role, full_name')
        .in('role', ['admin', 'super_admin', 'moderator', 'user'])
        .order('role', { ascending: true });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load users',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, newRole: 'admin' | 'super_admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .schema('public')
        .from('profiles')
        .update({ role: newRole })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Role updated successfully',
      });

      fetchUsers();
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
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage user roles and permissions</p>
      </div>

      <div className="bg-card border border-border rounded-lg">
        {profiles.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users with assigned roles yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {profiles.map((profile) => (
              <div key={profile.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{profile.full_name || 'Unnamed'}</p>
                  <p className="font-mono text-xs text-muted-foreground">{profile.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={profile.role}
                    onValueChange={(value) => handleRoleChange(profile.id, value as 'admin' | 'super_admin' | 'moderator' | 'user')}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-6">
        <h2 className="font-semibold mb-3">About User Roles</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><strong>Admin:</strong> Full access to all features including user management</li>
          <li><strong>Moderator:</strong> Can manage content but not user roles</li>
          <li><strong>User:</strong> Basic access (can be customized based on your needs)</li>
        </ul>
      </div>
    </div>
  );
}
