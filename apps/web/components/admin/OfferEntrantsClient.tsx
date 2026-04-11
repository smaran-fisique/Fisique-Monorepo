'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2, Trash2, ArrowLeft, Users, Trophy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

interface Entrant {
  id: string;
  name: string;
  phone: string | null;
  notes: string | null;
  created_at: string;
}

interface Offer {
  id: string;
  title: string;
}

interface OfferEntrantsClientProps {
  offerId: string;
}

export function OfferEntrantsClient({ offerId }: OfferEntrantsClientProps) {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [entrants, setEntrants] = useState<Entrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (offerId) {
      fetchData();
    }
  }, [offerId]);

  const fetchData = async () => {
    try {
      // Fetch offer details
      const { data: offerData, error: offerError } = await supabase
        .from('offers')
        .select('id, title')
        .eq('id', offerId)
        .single();

      if (offerError) throw offerError;
      setOffer(offerData);

      // Fetch entrants
      const { data: entrantsData, error: entrantsError } = await supabase
        .from('offer_entrants')
        .select('*')
        .eq('offer_id', offerId)
        .order('created_at', { ascending: true });

      if (entrantsError) throw entrantsError;
      setEntrants(entrantsData || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to load data',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntrant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const entrantData = {
      offer_id: offerId,
      name: formData.get('name') as string,
      phone: (formData.get('phone') as string) || null,
      notes: (formData.get('notes') as string) || null,
      created_by: user?.id,
    };

    try {
      const { error } = await supabase
        .from('offer_entrants')
        .insert(entrantData);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Entrant added to the draw',
      });

      setDialogOpen(false);
      fetchData();
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

  const handleDeleteEntrant = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the draw?`)) return;

    try {
      const { error } = await supabase
        .from('offer_entrants')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Entrant removed',
      });

      fetchData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const probability = entrants.length > 0 ? (100 / entrants.length).toFixed(1) : "0";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Offer not found</p>
        <Button asChild className="mt-4">
          <Link href="/admin/offers">Back to Offers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/offers"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Offers
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{offer.title}</h1>
            <p className="text-muted-foreground">Manage draw entrants</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Entrant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Entrant</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddEntrant} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" name="name" placeholder="e.g., Rahul K." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" placeholder="e.g., 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="e.g., 3-month PT membership, started Jan 15"
                    rows={2}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                  Add to Draw
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{entrants.length}</p>
              <p className="text-sm text-muted-foreground">Total Entrants</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{probability}%</p>
              <p className="text-sm text-muted-foreground">Win Probability Each</p>
            </div>
          </div>
        </div>
      </div>

      {/* Entrants List */}
      <div className="bg-card border border-border rounded-lg">
        {entrants.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No entrants yet</p>
            <Button onClick={() => setDialogOpen(true)}>Add first entrant</Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Table Header */}
            <div className="px-4 py-3 bg-muted/50 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <span className="col-span-1">#</span>
              <span className="col-span-3">Name</span>
              <span className="col-span-2">Phone</span>
              <span className="col-span-3">Notes</span>
              <span className="col-span-2">Win Chance</span>
              <span className="col-span-1"></span>
            </div>
            {/* Table Body */}
            {entrants.map((entrant, index) => (
              <div key={entrant.id} className="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-accent/50 transition-colors">
                <span className="col-span-1 text-accent font-semibold">{index + 1}</span>
                <span className="col-span-3 font-medium">{entrant.name}</span>
                <span className="col-span-2 text-sm text-muted-foreground">{entrant.phone || '-'}</span>
                <span className="col-span-3 text-sm text-muted-foreground truncate">{entrant.notes || '-'}</span>
                <span className="col-span-2 text-accent font-semibold">{probability}%</span>
                <div className="col-span-1 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntrant(entrant.id, entrant.name)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
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
