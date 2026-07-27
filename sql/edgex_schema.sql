-- Run this in the Supabase SQL editor for your project.
-- Mirrors app/services/powersync/schema.ts — keep the two in sync.

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  employment_type text not null,
  summary text not null default '',
  description text not null default '',
  requirements text not null default '[]', -- JSON-encoded string array
  posted_at date not null default now(),
  active boolean not null default true
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs (id),
  full_name text not null,
  email text not null,
  phone text,
  cover_note text,
  resume_path text,
  upload_status text not null default 'pending',
  created_at timestamptz not null default now()
);
-- Note: `sync_status` (pending/synced/failed) lives only in the local SQLite
-- outbox on-device — it's an implementation detail of the client's offline
-- queue, not something Supabase needs to track.

alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- Anyone (including anon) can read active job listings.
create policy "Public read access to active jobs"
  on public.jobs for select
  using (active = true);

-- Applicants can insert their own application; no public read of others' applications.
create policy "Anyone can submit an application"
  on public.applications for insert
  with check (true);

-- The offline sync client re-upserts a row after the resume finishes
-- uploading (to attach resume_path), so it needs update as well as insert.
-- This is intentionally permissive for a public apply form with no auth
-- requirement; if you want tighter guarantees later, move the update step
-- into a server-side function using the service-role key instead.
create policy "Application rows can be updated by the sync client"
  on public.applications for update
  using (true)
  with check (true);

-- OPTIONAL: if you want applicants to see their own submitted applications
-- (e.g. an "my applications" screen), scope this to auth.email() or a user_id
-- column instead of leaving it open. Left commented out until you need it.
-- create policy "Applicants can read their own applications"
--   on public.applications for select
--   using (auth.email() = email);

-- Storage bucket for resumes. Private by default — only accessible via
-- signed URLs or from server-side/service-role contexts, not public.
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

create policy "Anyone can upload a resume"
  on storage.objects for insert
  with check (bucket_id = 'resumes');
