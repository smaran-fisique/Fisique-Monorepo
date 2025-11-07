-- Create google_reviews table to cache reviews
CREATE TABLE IF NOT EXISTS public.google_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  text TEXT NOT NULL,
  time TIMESTAMP WITH TIME ZONE NOT NULL,
  profile_photo_url TEXT,
  relative_time_description TEXT NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (reviews are public data)
CREATE POLICY "Anyone can view google reviews"
  ON public.google_reviews
  FOR SELECT
  USING (true);

-- Create index on fetched_at for quick cache freshness checks
CREATE INDEX idx_google_reviews_fetched_at ON public.google_reviews(fetched_at DESC);