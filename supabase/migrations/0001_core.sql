-- HOUSI App 2027: reviewed-in-repository draft, NOT applied to any database.
-- Apply only to a new, dedicated Supabase project after security review.
create extension if not exists pgcrypto;

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (length(btrim(title)) between 1 and 160),
  city text not null check (length(btrim(city)) between 1 and 120),
  price_mxn numeric(15,2) not null check (price_mxn >= 0),
  created_at timestamptz not null default now()
);
create index if not exists properties_owner_created_idx on public.properties(owner_id, created_at desc);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null check (length(btrim(full_name)) between 1 and 160),
  phone text check (phone is null or length(phone) <= 30),
  email text check (email is null or length(email) <= 254),
  created_at timestamptz not null default now()
);
create index if not exists contacts_owner_created_idx on public.contacts(owner_id, created_at desc);

alter table public.properties enable row level security;
alter table public.contacts enable row level security;

revoke all on public.properties from anon;
revoke all on public.contacts from anon;
grant select, insert, update, delete on public.properties to authenticated;
grant select, insert, update, delete on public.contacts to authenticated;

create policy properties_select_own on public.properties for select to authenticated using (owner_id = (select auth.uid()));
create policy properties_insert_own on public.properties for insert to authenticated with check (owner_id = (select auth.uid()));
create policy properties_update_own on public.properties for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy properties_delete_own on public.properties for delete to authenticated using (owner_id = (select auth.uid()));

create policy contacts_select_own on public.contacts for select to authenticated using (owner_id = (select auth.uid()));
create policy contacts_insert_own on public.contacts for insert to authenticated with check (owner_id = (select auth.uid()));
create policy contacts_update_own on public.contacts for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy contacts_delete_own on public.contacts for delete to authenticated using (owner_id = (select auth.uid()));
