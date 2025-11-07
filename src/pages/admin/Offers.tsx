import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Offer {
  id: string;
  title: string;
  description: string | null;
  cta_text: string;
  cta_link: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load offers',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const offerData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      cta_text: formData.get('cta_text') as string,
      cta_link: formData.get('cta_link') as string,
      start_date: formData.get('start_date') as string,
      end_date: formData.get('end_date') as string,
      is_active: formData.get('is_active') === 'on',
      created_by: user?.id,
    };

    try {
      if (editingOffer) {
        const { error } = await supabase
          .from('offers')
          .update(offerData)
          .eq('id', editingOffer.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('offers')
          .insert(offerData);
        if (error) throw error;
      }

      toast({
        title: 'Success',
        description: `Offer ${editingOffer ? 'updated' : 'created'}`,
      });

      setDialogOpen(false);
      setEditingOffer(null);
      fetchOffers();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this offer?')) return;

    try {
      const { error } = await supabase.from('offers').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Offer deleted' });
      fetchOffers();
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
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
          <h1 className="text-3xl font-bold">Offers</h1>
          <p className="text-muted-foreground">Manage promotional banners</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingOffer(null)}>
              <Plus className="w-4 h-4 mr-2" />
              New Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingOffer ? 'Edit' : 'New'} Offer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editingOffer?.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingOffer?.description || ''} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_text">CTA Text</Label>
                  <Input id="cta_text" name="cta_text" defaultValue={editingOffer?.cta_text} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_link">CTA Link</Label>
                  <Input id="cta_link" name="cta_link" defaultValue={editingOffer?.cta_link} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input 
                    id="start_date" 
                    name="start_date" 
                    type="datetime-local" 
                    defaultValue={editingOffer?.start_date?.slice(0, 16)} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input 
                    id="end_date" 
                    name="end_date" 
                    type="datetime-local" 
                    defaultValue={editingOffer?.end_date?.slice(0, 16)} 
                    required 
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="is_active" name="is_active" defaultChecked={editingOffer?.is_active ?? true} />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <Button type="submit" className="w-full">Save Offer</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-lg">
        {offers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No offers yet</p>
            <Button onClick={() => setDialogOpen(true)}>Create your first offer</Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {offers.map((offer) => (
              <div key={offer.id} className="p-4 flex items-start justify-between hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{offer.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      offer.is_active ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {offer.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {offer.description && <p className="text-sm text-muted-foreground mb-2">{offer.description}</p>}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>From: {new Date(offer.start_date).toLocaleDateString()}</span>
                    <span>To: {new Date(offer.end_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { setEditingOffer(offer); setDialogOpen(true); }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(offer.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
