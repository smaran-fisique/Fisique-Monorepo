import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Plus, Pencil, Trash2, Gift, Users, Vote, BarChart3, Upload, RefreshCw } from 'lucide-react';
import CategoryPointsDialog from '@/components/admin/CategoryPointsDialog';
import * as XLSX from 'xlsx';

type Participant = {
  id: string;
  name: string;
  phone: string;
  points: number;
  referral_count: number;
  vote_count: number;
  created_at: string;
};

type VoteRow = {
  id: string;
  voter_phone: string;
  discount_code: string;
  discount_expires_at: string;
  created_at: string;
  challenge_participants: { name: string } | null;
};

/** Converts a string to Title Case (e.g. "john DOE" → "John Doe") */
function toTitleCase(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
}

export default function ChallengeManager() {
  const { toast } = useToast();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categoryPointsOpen, setCategoryPointsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  // Bulk import state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importPreview, setImportPreview] = useState<{ name: string; phone: string }[]>([]);
  const [importLoading, setImportLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const [pRes, vRes, sRes] = await Promise.all([
      supabase.from('challenge_participants').select('*').order('points', { ascending: false }),
      supabase.from('challenge_votes').select('*, challenge_participants(name)').order('created_at', { ascending: false }),
      supabase.from('site_settings').select('value').eq('key', 'members_last_synced').maybeSingle(),
    ]);
    if (pRes.data) setParticipants(pRes.data);
    if (vRes.data) setVotes(vRes.data as unknown as VoteRow[]);
    if (sRes.data) setLastSynced(sRes.data.value);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!formName.trim() || !formPhone.trim()) return;
    const { error } = await supabase.from('challenge_participants').insert({ name: toTitleCase(formName), phone: formPhone.trim() });
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Participant added' });
    setAddOpen(false);
    setFormName('');
    setFormPhone('');
    fetchData();
  };

  const handleEdit = async () => {
    if (!selectedParticipant || !formName.trim() || !formPhone.trim()) return;
    const { error } = await supabase.from('challenge_participants').update({ name: toTitleCase(formName), phone: formPhone.trim() }).eq('id', selectedParticipant.id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Participant updated' });
    setEditOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selectedParticipant) return;
    const { error } = await supabase.from('challenge_participants').delete().eq('id', selectedParticipant.id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Participant deleted' });
    setDeleteOpen(false);
    fetchData();
  };


  const openEdit = (p: Participant) => { setSelectedParticipant(p); setFormName(p.name); setFormPhone(p.phone); setEditOpen(true); };
  const openPoints = (p: Participant) => { setSelectedParticipant(p); setCategoryPointsOpen(true); };
  const openDelete = (p: Participant) => { setSelectedParticipant(p); setDeleteOpen(true); };

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      const res = await supabase.functions.invoke('sync-members');
      if (res.error) throw res.error;
      const { synced, message, error } = res.data as { synced?: number; message?: string; error?: string };
      if (error) throw new Error(error);
      toast({ title: message || `Synced ${synced} members` });
      fetchData();
    } catch (err: any) {
      toast({ title: 'Sync failed', description: err.message, variant: 'destructive' });
    } finally {
      setSyncLoading(false);
    }
  };

  // --- Bulk Import ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

        const parsed: { name: string; phone: string }[] = [];
        for (const row of rows) {
          // Try common column name variations
          const name = String(row['Name'] ?? row['name'] ?? row['NAME'] ?? '').trim();
          const phone = String(row['Phone'] ?? row['phone'] ?? row['PHONE'] ?? row['Phone Number'] ?? row['phone number'] ?? '').trim();
          if (name && phone) {
            parsed.push({ name: toTitleCase(name), phone });
          }
        }

        if (parsed.length === 0) {
          toast({ title: 'No valid rows found', description: 'Ensure columns are named "Name" and "Phone".', variant: 'destructive' });
          return;
        }

        setImportPreview(parsed);
        setImportOpen(true);
      } catch {
        toast({ title: 'Failed to parse file', variant: 'destructive' });
      }
    };
    reader.readAsArrayBuffer(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const handleBulkImport = async () => {
    if (importPreview.length === 0) return;
    setImportLoading(true);

    const { error, data } = await supabase.from('challenge_participants').upsert(
      importPreview.map(r => ({ name: r.name, phone: r.phone })),
      { onConflict: 'phone', ignoreDuplicates: false }
    ).select();

    setImportLoading(false);

    if (error) {
      toast({ title: 'Import failed', description: error.message, variant: 'destructive' });
      return;
    }

    toast({ title: `Imported ${data?.length ?? importPreview.length} participants (duplicates updated)` });
    setImportOpen(false);
    setImportPreview([]);
    fetchData();
  };

  const totalVotes = votes.length;
  const uniqueVoters = new Set(votes.map(v => v.voter_phone)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Challenge Manager</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Participants', value: participants.length, icon: Users },
          { label: 'Total Votes', value: totalVotes, icon: Vote },
          { label: 'Unique Voters', value: uniqueVoters, icon: BarChart3 },
        ].map(s => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4 flex items-center gap-3">
            <s.icon className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="participants">
        <TabsList>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="votes">Votes</TabsTrigger>
        </TabsList>

        <TabsContent value="participants" className="space-y-4">
          <div className="flex items-center justify-between">
            {lastSynced && (
              <p className="text-xs text-muted-foreground">
                Last synced: {new Date(lastSynced).toLocaleString()}
              </p>
            )}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={handleSync} disabled={syncLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${syncLoading ? 'animate-spin' : ''}`} /> {syncLoading ? 'Syncing…' : 'Sync Now'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" /> Import CSV / Excel
              </Button>
              <Button onClick={() => { setFormName(''); setFormPhone(''); setAddOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" /> Add Participant
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Referrals</TableHead>
                <TableHead className="text-right">Votes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
              ) : participants.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No participants yet</TableCell></TableRow>
              ) : participants.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell className="text-right">{p.points}</TableCell>
                  <TableCell className="text-right">{p.referral_count}</TableCell>
                  <TableCell className="text-right">{p.vote_count}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => openPoints(p)}><Gift className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => openDelete(p)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="votes">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Voter Phone</TableHead>
                <TableHead>Voted For</TableHead>
                <TableHead>Discount Code</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
              ) : votes.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No votes yet</TableCell></TableRow>
              ) : votes.map(v => (
                <TableRow key={v.id}>
                  <TableCell>{v.voter_phone}</TableCell>
                  <TableCell>{v.challenge_participants?.name ?? '—'}</TableCell>
                  <TableCell className="font-mono text-xs">{v.discount_code}</TableCell>
                  <TableCell>{new Date(v.discount_expires_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(v.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Participant</DialogTitle>
            <DialogDescription>Enter the contestant's name and phone number.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Name" value={formName} onChange={e => setFormName(e.target.value)} />
            <Input placeholder="Phone" value={formPhone} onChange={e => setFormPhone(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={handleAdd}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Participant</DialogTitle>
            <DialogDescription>Update the contestant's details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Name" value={formName} onChange={e => setFormName(e.target.value)} />
            <Input placeholder="Phone" value={formPhone} onChange={e => setFormPhone(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Points Dialog */}
      <CategoryPointsDialog
        open={categoryPointsOpen}
        onOpenChange={setCategoryPointsOpen}
        participant={selectedParticipant}
        onUpdated={fetchData}
      />

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Participant</DialogTitle>
            <DialogDescription>Are you sure you want to delete {selectedParticipant?.name}? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Preview Dialog */}
      <Dialog open={importOpen} onOpenChange={(open) => { setImportOpen(open); if (!open) setImportPreview([]); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Import Preview</DialogTitle>
            <DialogDescription>{importPreview.length} participant{importPreview.length !== 1 ? 's' : ''} found. Names are auto-formatted to Title Case.</DialogDescription>
          </DialogHeader>
          <div className="max-h-64 overflow-y-auto border border-border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {importPreview.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setImportOpen(false); setImportPreview([]); }}>Cancel</Button>
            <Button onClick={handleBulkImport} disabled={importLoading}>
              {importLoading ? 'Importing…' : `Import ${importPreview.length}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
