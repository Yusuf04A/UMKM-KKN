-- ============================================================
-- UMKM-KKN — Supabase schema
-- Jalankan di: Supabase Dashboard > SQL Editor > New query > paste > Run
--
-- Script ini AMAN dijalankan berulang kali (idempotent).
-- Bisa dipakai untuk setup awal maupun memperbaiki database yang
-- terlanjur dibuat dengan versi schema sebelumnya.
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROFILES
-- Satu baris per user. Menyimpan data tambahan yang tidak ada di
-- auth.users, termasuk kuota kredit AI.
-- Nama kolom mengikuti kode: app/api/generate-caption/route.ts
-- dan app/dashboard/layout.tsx sama-sama memakai free_credits + is_premium.
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  business_name text,                            -- nama UMKM (opsional)
  free_credits integer not null default 10,      -- sisa kuota generate caption
  is_premium boolean not null default false,     -- true = kuota tidak dipotong
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 1a. Migrasi: kalau tabel terlanjur dibuat dengan kolom lama "credits",
--     ganti namanya jadi "free_credits" tanpa kehilangan data.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'credits'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'profiles' and column_name = 'free_credits'
  ) then
    alter table public.profiles rename column credits to free_credits;
  end if;
end $$;

-- 1b. Pastikan kolom yang dibutuhkan kode benar-benar ada.
alter table public.profiles add column if not exists free_credits integer not null default 10;
alter table public.profiles add column if not exists is_premium boolean not null default false;

-- 1c. Backfill: bikin baris profiles untuk user yang SUDAH terdaftar
--     sebelum trigger di bawah dipasang. Tanpa ini, user lama akan
--     kena error "Profil tidak ditemukan" karena barisnya memang tidak ada.
insert into public.profiles (id, email)
select u.id, u.email
from auth.users u
on conflict (id) do nothing;

-- 1d. Row Level Security
alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ------------------------------------------------------------
-- 2. CAPTIONS
-- Riwayat caption hasil AI, per user. Belum dipakai kode saat ini,
-- disiapkan kalau nanti mau menyimpan histori.
-- ------------------------------------------------------------
create table if not exists public.captions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  image_url text,               -- opsional, jika gambar diupload ke Supabase Storage
  tone text,                    -- tone yang dipilih user
  platform text,                -- Instagram / TikTok / dll
  caption text not null,        -- hasil caption dari AI
  created_at timestamptz not null default now()
);

alter table public.captions enable row level security;

drop policy if exists "Users can view own captions" on public.captions;
create policy "Users can view own captions"
  on public.captions for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own captions" on public.captions;
create policy "Users can insert own captions"
  on public.captions for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own captions" on public.captions;
create policy "Users can delete own captions"
  on public.captions for delete
  using (auth.uid() = user_id);

create index if not exists captions_user_id_created_at_idx
  on public.captions (user_id, created_at desc);

-- ------------------------------------------------------------
-- 3. Auto-create profile setiap ada user baru daftar
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 4. Auto-update kolom updated_at di profiles
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 5. Cek hasil — jalankan setelah script di atas selesai.
--    Harus muncul satu baris untuk tiap user yang terdaftar.
-- ------------------------------------------------------------
-- select id, email, free_credits, is_premium from public.profiles;
