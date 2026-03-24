import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
  { key: 'pt_referral', label: 'PT Referral', points: 120, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
  { key: 'membership_referral', label: 'Membership Referral', points: 60, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  { key: 'instagram_post', label: 'Instagram Post', points: 30, color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
  { key: 'instagram_story', label: 'Instagram Story', points: 15, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

type PointLog = {
  id: string;
  category: string;
  points: number;
  created_at: string;
};

type Participant = {
  id: string;
  name: string;
  phone: string;
  points: number;
  referral_count: number;
  vote_count: number;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: Participant | null;
  onUpdated: () => void;
}

export default function CategoryPointsDialog({ open, onOpenChange, participant, onUpdated }: Props) {
  const { toast } = useToast();
  const [logs, setLogs] = useState<PointLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  // Keep a local copy of participant data that stays fresh
  const [liveParticipant, setLiveParticipant] = useState<Participant | null>(null);

  const fetchParticipant = useCallback(async () => {
    if (!participant) return;
    const { data } = await supabase
      .from('challenge_participants')
      .select('id, name, phone, points, referral_count, vote_count')
      .eq('id', participant.id)
      .single();
    if (data) setLiveParticipant(data);
  }, [participant?.id]);

  const fetchLogs = useCallback(async () => {
    if (!participant) return;
    setLoading(true);
    const { data } = await supabase
      .from('challenge_point_logs' as any)
      .select('id, category, points, created_at')
      .eq('participant_id', participant.id)
      .order('created_at', { ascending: false });
    setLogs((data as any as PointLog[]) ?? []);
    setLoading(false);
  }, [participant?.id]);

  useEffect(() => {
    if (open && participant) {
      setLiveParticipant(participant);
      fetchLogs();
      fetchParticipant();
    }
  }, [open, participant]);

  const p = liveParticipant;

  const categoryCounts = CATEGORIES.map(cat => {
    const catLogs = logs.filter(l => l.category === cat.key);
    return {
      ...cat,
      count: catLogs.length,
      totalPoints: catLogs.reduce((s, l) => s + l.points, 0),
    };
  });

  const refreshAll = async () => {
    await Promise.all([fetchLogs(), fetchParticipant()]);
    onUpdated();
  };

  const handleAdd = async (catKey: CategoryKey, points: number) => {
    if (!p) return;
    setActionLoading(`add-${catKey}`);
    
    const { error: logErr } = await supabase
      .from('challenge_point_logs' as any)
      .insert({ participant_id: p.id, category: catKey, points } as any);

    if (logErr) {
      toast({ title: 'Error', description: logErr.message, variant: 'destructive' });
      setActionLoading(null);
      return;
    }

    const isReferral = catKey === 'pt_referral' || catKey === 'membership_referral';
    const updates: any = { points: p.points + points };
    if (isReferral) updates.referral_count = p.referral_count + 1;

    await supabase.from('challenge_participants').update(updates).eq('id', p.id);

    toast({ title: `+${points} pts (${CATEGORIES.find(c => c.key === catKey)?.label})` });
    setActionLoading(null);
    await refreshAll();
  };

  const handleRemoveLast = async (catKey: CategoryKey) => {
    if (!p) return;
    const lastLog = logs.find(l => l.category === catKey);
    if (!lastLog) return;

    setActionLoading(`rm-${catKey}`);

    const { error } = await supabase
      .from('challenge_point_logs' as any)
      .delete()
      .eq('id', lastLog.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setActionLoading(null);
      return;
    }

    const isReferral = catKey === 'pt_referral' || catKey === 'membership_referral';
    const updates: any = { points: Math.max(0, p.points - lastLog.points) };
    if (isReferral) updates.referral_count = Math.max(0, p.referral_count - 1);

    await supabase.from('challenge_participants').update(updates).eq('id', p.id);

    toast({ title: `Removed ${lastLog.points} pts (${CATEGORIES.find(c => c.key === catKey)?.label})` });
    setActionLoading(null);
    await refreshAll();
  };

  const votePoints = Math.min(p?.vote_count ?? 0, 40) * 10;
  const categoryTotal = categoryCounts.reduce((s, c) => s + c.totalPoints, 0);
  const joinBonus = 50;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Points — {p?.name}</DialogTitle>
          <DialogDescription>
            Add or remove category points. Total: {joinBonus} (join) + {categoryTotal} (activities) + {votePoints} (votes) = {joinBonus + categoryTotal + votePoints} pts
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="space-y-3">
            {categoryCounts.map(cat => (
              <div key={cat.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Badge variant="secondary" className={`${cat.color} text-xs shrink-0`}>
                    +{cat.points}
                  </Badge>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{cat.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {cat.count} × {cat.points} = {cat.totalPoints} pts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={cat.count === 0 || actionLoading !== null}
                    onClick={() => handleRemoveLast(cat.key)}
                  >
                    {actionLoading === `rm-${cat.key}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Minus className="w-3 h-3" />}
                  </Button>
                  <span className="w-8 text-center font-bold text-sm">{cat.count}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={actionLoading !== null}
                    onClick={() => handleAdd(cat.key, cat.points)}
                  >
                    {actionLoading === `add-${cat.key}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
            ))}

            {/* Summary row for votes & join */}
            <div className="rounded-lg bg-muted/50 p-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Join Bonus</span><span>+{joinBonus}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Votes ({Math.min(p?.vote_count ?? 0, 40)}/40)</span><span>+{votePoints}</span></div>
              <div className="flex justify-between font-bold border-t border-border pt-1 mt-1"><span>Total</span><span>{joinBonus + categoryTotal + votePoints}</span></div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
