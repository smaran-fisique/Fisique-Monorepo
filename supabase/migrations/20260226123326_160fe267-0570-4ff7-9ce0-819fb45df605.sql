
-- Challenge participants table
CREATE TABLE public.challenge_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  points INTEGER NOT NULL DEFAULT 50,
  referral_count INTEGER NOT NULL DEFAULT 0,
  vote_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view challenge participants"
  ON public.challenge_participants FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage challenge participants"
  ON public.challenge_participants FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Challenge votes table
CREATE TABLE public.challenge_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  participant_id UUID NOT NULL REFERENCES public.challenge_participants(id) ON DELETE CASCADE,
  voter_phone TEXT NOT NULL,
  discount_code TEXT NOT NULL,
  discount_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(voter_phone, participant_id)
);

ALTER TABLE public.challenge_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage challenge votes"
  ON public.challenge_votes FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Challenge OTPs table (service role only)
CREATE TABLE public.challenge_otps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  otp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.challenge_otps ENABLE ROW LEVEL SECURITY;

-- No public policies — only service role can access

-- Enable realtime on challenge_participants
ALTER PUBLICATION supabase_realtime ADD TABLE public.challenge_participants;
