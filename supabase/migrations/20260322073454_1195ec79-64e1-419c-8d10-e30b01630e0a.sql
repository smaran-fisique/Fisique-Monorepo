
CREATE TABLE public.challenge_point_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid NOT NULL REFERENCES public.challenge_participants(id) ON DELETE CASCADE,
  category text NOT NULL CHECK (category IN ('pt_referral', 'membership_referral', 'instagram_post', 'instagram_story')),
  points integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid
);

ALTER TABLE public.challenge_point_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage point logs" ON public.challenge_point_logs
  FOR ALL TO public
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view point logs" ON public.challenge_point_logs
  FOR SELECT TO public
  USING (true);
