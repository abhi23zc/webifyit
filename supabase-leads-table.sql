-- ═══════════════════════════════════════════════════════════════
-- Leads Table — Stores all form submissions / inquiries
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS leads (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name             TEXT NOT NULL,
  email            TEXT,
  phone            TEXT,
  business_description TEXT,
  service_interest TEXT,
  source           TEXT DEFAULT 'Website Form',
  status           TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS with open access (single-owner site)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert leads" ON leads;
CREATE POLICY "Allow insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read leads" ON leads;
CREATE POLICY "Allow read leads"
  ON leads FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow update leads" ON leads;
CREATE POLICY "Allow update leads"
  ON leads FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Allow delete leads" ON leads;
CREATE POLICY "Allow delete leads"
  ON leads FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
