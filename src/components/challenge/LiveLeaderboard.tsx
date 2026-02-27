import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Vote, Trophy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoteModal } from "./VoteModal";
import { toast } from "sonner";

interface Participant {
  id: string;
  name: string;
  points: number;
  vote_count: number;
}

export const LiveLeaderboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParticipant, setSelectedParticipant] = useState<{ id: string; name: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchParticipants = async () => {
    const { data } = await supabase
      .from("challenge_participants")
      .select("id, name, points, vote_count")
      .order("points", { ascending: false });
    if (data) setParticipants(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchParticipants();

    const channel = supabase
      .channel("challenge-leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "challenge_participants" },
        () => fetchParticipants()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Auto-open vote modal when participants load and vote param exists
  useEffect(() => {
    const voteId = searchParams.get("vote");
    if (voteId && participants.length > 0) {
      const match = participants.find((p) => p.id === voteId);
      if (match) {
        setSelectedParticipant({ id: match.id, name: match.name });
        setModalOpen(true);
        searchParams.delete("vote");
        setSearchParams(searchParams, { replace: true });
        // Scroll to leaderboard
        document.getElementById("leaderboard")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [participants, searchParams]);

  const handleVote = (p: Participant) => {
    setSelectedParticipant({ id: p.id, name: p.name });
    setModalOpen(true);
  };

  // Derive stats
  const totalParticipants = participants.length;
  const totalVotes = participants.reduce((s, p) => s + p.vote_count, 0);
  const totalReferrals = participants.reduce((s, p) => s + ((p as any).referral_count || 0), 0);

  return (
    <>
      {/* Live Stats */}
      <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
        {[
          { label: "Participants", value: totalParticipants.toLocaleString() },
          { label: "Votes Cast", value: totalVotes.toLocaleString() },
        ].map((stat) => (
          <span key={stat.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-sm">
            <span className="font-bold text-foreground">{stat.value}</span>
            <span className="text-muted-foreground">{stat.label}</span>
          </span>
        ))}
      </div>

      {/* Leaderboard */}
      <div id="leaderboard" className="max-w-lg mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-3">Live Leaderboard</p>
        <div className="premium-card rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
          ) : participants.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">No participants yet. Be the first to join!</div>
          ) : (
            participants.map((p, i) => (
              <div
                key={p.id}
                className={`px-4 py-3 ${i < participants.length - 1 ? "border-b border-border/50" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0
                          ? "bg-accent/20 text-accent"
                          : i === 1
                          ? "bg-accent/10 text-accent/80"
                          : i === 2
                          ? "bg-accent/5 text-accent/60"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i < 3 ? <Trophy className="w-3.5 h-3.5" /> : i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.vote_count} votes · {p.points} pts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Vote for ${p.name} in the Fisique Champions Challenge and get ₹1,000 off membership! 💪 https://fisique.fitness/fisique-challenge?vote=${p.id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                      title={`Share ${p.name}'s profile`}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </a>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-accent border-accent/30 hover:bg-accent/10 gap-1.5"
                      onClick={() => handleVote(p)}
                    >
                      <Vote className="w-4 h-4" /> Vote
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <VoteModal open={modalOpen} onOpenChange={setModalOpen} participant={selectedParticipant} />
    </>
  );
};
