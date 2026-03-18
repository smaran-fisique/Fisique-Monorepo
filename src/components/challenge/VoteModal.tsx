import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Vote, CheckCircle, Loader2, MessageCircle } from "lucide-react";

type Step = "phone" | "otp" | "success";

interface VoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participant: { id: string; name: string } | null;
}

export const VoteModal = ({ open, onOpenChange, participant }: VoteModalProps) => {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const reset = () => {
    setStep("phone");
    setPhone("");
    setOtp("");
    setLoading(false);
    setDiscountCode("");
    setExpiresAt("");
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const sendOtp = async () => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    const fullPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("challenge-vote", {
        body: { action: "send-otp", phone: fullPhone },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setPhone(fullPhone);
      setStep("otp");
      toast.success("OTP sent via WhatsApp!");
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyVote = async () => {
    if (otp.length !== 6 || !participant) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("challenge-vote", {
        body: {
          action: "verify-vote",
          participant_id: participant.id,
          voter_phone: phone,
          otp,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setDiscountCode(data.discount_code);
      setExpiresAt(data.expires_at);
      setStep("success");
    } catch (err: any) {
      toast.error(err.message || "Failed to verify vote");
    } finally {
      setLoading(false);
    }
  };

  if (!participant) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === "success" ? "Vote Confirmed!" : `Vote for ${participant.name}`}
          </DialogTitle>
        </DialogHeader>

        {step === "phone" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your phone number to receive a verification code via WhatsApp.
            </p>
            <Input
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={12}
              type="tel"
            />
            <Button onClick={sendOtp} disabled={loading} className="w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Vote className="w-4 h-4 mr-2" />}
              Send OTP via WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              One vote per phone number per participant
            </p>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to your WhatsApp.
            </p>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button onClick={verifyVote} disabled={loading || otp.length !== 6} className="w-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Confirm Vote
            </Button>
            <button
              onClick={() => { setStep("phone"); setOtp(""); }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              Didn't receive it? Go back
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Your vote for <span className="font-semibold text-foreground">{participant.name}</span> has been recorded!
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Here's your ₹1,000 off discount code:
              </p>
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-2">
                <p className="text-2xl font-mono font-bold tracking-widest text-foreground">{discountCode}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Valid until {new Date(expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <Button asChild className="w-full" size="lg">
              <a
                href={`https://wa.me/919515469444?text=${encodeURIComponent(`I would like to claim my vote discount`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Claim Now on WhatsApp
              </a>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              One discount code per phone number. Vote for multiple candidates but only one ₹1,000 discount per voter.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
