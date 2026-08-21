-- ============================================================
-- UMKM-KKN — Supabase schema
-- Jalankan di: Supabase Dashboard > SQL Editor > New query > paste > Run
-- ============================================================

-- 1. PROFILES
-- Satu baris per user, dibuat otomatis saat user daftar/login (via trigger di bawah).
-- Menyimpan data tambahan yang tidak ada di auth.users, termasuk kredit AI.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  business_name text,          -- nama UMKM (opsional, bisa diisi belakangan)
  credits integer not null default 10,  -- kuota generate caption, default 10 sesuai placeholder dashboard
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. CAPTIONS
-- Riwayat caption yang di-generate AI, per user.
create table if not exists public.captions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  image_url text,               -- opsional, jika gambar diupload ke Supabase Storage
  tone text,                    -- tone yang dipilih user saat generate
  caption text not null,        -- hasil caption dari AI
  created_at timestamptz not null default now()
);

alter table public.captions enable row level security;

create policy "Users can view own captions"
  on public.captions for select
  using (auth.uid() = user_id);

create policy "Users can insert own captions"
  on public.captions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own captions"
  on public.captions for delete
  using (auth.uid() = user_id);

create index if not exists captions_user_id_created_at_idx
  on public.captions (user_id, created_at desc);

-- 3. Auto-create profile saat user baru daftar (Supabase Auth)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Auto-update updated_at di profiles
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();
