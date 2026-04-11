'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield } from 'lucide-react';

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

export function UsersClient() {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserRoles(data || []);
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

  const handleRoleChange = async (id: string, newRole: 'admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
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
        {userRoles.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No users with assigned roles yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {userRoles.map((userRole) => (
              <div key={userRole.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium font-mono text-sm">{userRole.user_id}</p>
                  <p className="text-xs text-muted-foreground">User ID</p>
                </div>
                <div className="flex items-center gap-3">
                  <Select
                    value={userRole.role}
                    onValueChange={(value) => handleRoleChange(userRole.id, value as 'admin' | 'moderator' | 'user')}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
