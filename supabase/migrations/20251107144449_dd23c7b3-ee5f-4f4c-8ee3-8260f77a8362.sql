-- Add google_review_id column to track unique reviews and prevent duplicates
ALTER TABLE google_reviews 
ADD COLUMN google_review_id TEXT;

-- Add unique constraint to prevent duplicate review imports
ALTER TABLE google_reviews 
ADD CONSTRAINT unique_google_review_id UNIQUE (google_review_id);

-- Add index for faster lookups during UPSERT operations
CREATE INDEX idx_google_review_id ON google_reviews(google_review_id);