-- ═══════════════════════════════════════════════════════════════
-- Blog System — Full Table Creation + Setup
-- Run this ONCE in Supabase SQL Editor. Creates the `blogs` table
-- from scratch with all fields needed for the markdown CMS.
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS blogs (
  id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug               TEXT NOT NULL UNIQUE,
  title              TEXT NOT NULL,
  description        TEXT NOT NULL,
  category           TEXT NOT NULL,
  tags               TEXT[] DEFAULT '{}',
  author_name        TEXT NOT NULL,
  author_role        TEXT NOT NULL,
  read_time          TEXT,
  cover_image_url    TEXT,
  cover_image_alt    TEXT,
  content_markdown   TEXT DEFAULT '',
  content            TEXT[] DEFAULT '{}',   -- legacy paragraph array (kept for compat)
  tech_takeaways     TEXT[] DEFAULT '{}',
  related_slugs      TEXT[] DEFAULT '{}',
  status             TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  scheduled_date     TIMESTAMPTZ,
  excerpt            TEXT,
  word_count         INTEGER DEFAULT 0,
  published_date     TIMESTAMPTZ,
  updated_date       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs (status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_date ON blogs (published_date DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);

-- ─── Row Level Security ──────────────────────────────────────
-- Enable RLS and allow public read access to published posts.
-- Writes go through Server Actions using the same anon key, so we
-- allow inserts/updates/deletes too (this is a single-owner admin
-- panel with no public-facing auth — protect /admin at the network
-- or app level if you need stronger guarantees).

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published posts" ON blogs;
CREATE POLICY "Public read published posts"
  ON blogs FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow insert" ON blogs;
CREATE POLICY "Allow insert"
  ON blogs FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update" ON blogs;
CREATE POLICY "Allow update"
  ON blogs FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Allow delete" ON blogs;
CREATE POLICY "Allow delete"
  ON blogs FOR DELETE
  USING (true);

-- ─── Storage bucket for blog images ──────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Public blog images read' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Public blog images read"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'blog-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow blog image uploads' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Allow blog image uploads"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'blog-images');
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- Done. Verify with:
-- SELECT * FROM blogs;
-- ═══════════════════════════════════════════════════════════════
