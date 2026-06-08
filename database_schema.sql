-- SQL Schema Setup for "Truyện mở ra – Điều hay nở hoa"
-- Hướng dẫn kết nối và chạy:
-- 1. Đăng nhập vào Supabase Console (https://supabase.com)
-- 2. Tạo một dự án mới (hoặc sử dụng dự án hiện có)
-- 3. Mở mục "SQL Editor" ở menu bên trái
-- 4. Tạo một query mới, dán toàn bộ mã dưới đây và bấm "Run"
-- 5. Sao chép URL dự án (Project URL) và Khóa ẩn danh (anon key) từ Project Settings > API để điền vào file .env của bạn.

-- =========================================================================
-- 1. BẢNG BÀI HỌC (lessons)
-- =========================================================================
create table if not exists public.lessons (
    id uuid primary key default gen_random_uuid(),
    lesson_number integer not null,
    slug text unique not null,
    title text not null,
    semester integer not null check (semester in (1, 2)),
    description text,
    thumbnail_url text,
    is_published boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- =========================================================================
-- 2. BẢNG TÀI NGUYÊN HỌC LIỆU (resources)
-- =========================================================================
create table if not exists public.resources (
    id uuid primary key default gen_random_uuid(),
    lesson_id uuid references public.lessons(id) on delete cascade,
    title text not null,
    resource_group text not null check (resource_group in ('interactive_digital', 'reading_support', 'teaching_model')),
    resource_type text not null check (resource_type in ('video', 'interactive_worksheet', 'podcast', 'visual_worksheet', 'drama_script', 'lesson_plan')),
    file_url text,         -- Link lưu file tải lên từ Supabase Storage
    external_url text,     -- Link ngoài (YouTube, Quizizz, Google Form, vv)
    description text,
    is_public boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- =========================================================================
-- 3. BẢNG HỒ SƠ ADMIN (profiles)
-- =========================================================================
create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    full_name text,
    avatar_url text,
    role text default 'guest' check (role in ('admin', 'guest')),
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Bật Row Level Security (RLS) cho tất cả các bảng
alter table public.lessons enable row level security;
alter table public.resources enable row level security;
alter table public.profiles enable row level security;

-- =========================================================================
-- 4. CHÍNH SÁCH BẢO MẬT (RLS POLICIES)
-- =========================================================================

-- --- Bảng Lessons ---
create policy "Anyone can view published lessons"
    on public.lessons for select
    using (is_published = true);

create policy "Admins have full access to lessons"
    on public.lessons for all
    using (
        (auth.jwt() ->> 'email') = 'baquan3q@gmail.com'
    );

-- --- Bảng Resources ---
create policy "Anyone can view public resources"
    on public.resources for select
    using (is_public = true);

create policy "Admins have full access to resources"
    on public.resources for all
    using (
        (auth.jwt() ->> 'email') = 'baquan3q@gmail.com'
    );

-- --- Bảng Profiles ---
create policy "Profiles are viewable by anyone"
    on public.profiles for select
    using (true);

create policy "Users can update their own profile"
    on public.profiles for update
    using (auth.uid() = id);

create policy "Admins have full access to profiles"
    on public.profiles for all
    using (
        (auth.jwt() ->> 'email') = 'baquan3q@gmail.com'
    );

-- =========================================================================
-- 5. TRIGGER TỰ ĐỘNG ĐỒNG BỘ AUTH.USERS SANG PROFILES VÀ PHÂN QUYỀN ADMIN
-- =========================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    case when new.email = 'baquan3q@gmail.com' then 'admin' else 'guest' end
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = excluded.full_name,
      avatar_url = excluded.avatar_url,
      role = case when excluded.email = 'baquan3q@gmail.com' then 'admin' else excluded.role end;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger chạy mỗi khi có user mới trong auth.users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================================
-- 6. THIẾT LẬP STORAGE BUCKET CHO FILE TÀI NGUYÊN (Word, PDF, MP3, Hình ảnh)
-- =========================================================================

-- Đăng ký bucket 'resources' (Nếu chưa tồn tại)
insert into storage.buckets (id, name, public)
values ('resources', 'resources', true)
on conflict (id) do nothing;

-- RLS policies cho storage.objects
create policy "Anyone can download storage files"
    on storage.objects for select
    using (bucket_id = 'resources');

create policy "Admins can upload files to storage"
    on storage.objects for insert
    with check (
        bucket_id = 'resources'
        and exists (
            select 1 from public.profiles
            where profiles.id = auth.uid() and profiles.role = 'admin'
        )
    );

create policy "Admins can update storage files"
    on storage.objects for update
    using (
        bucket_id = 'resources'
        and exists (
            select 1 from public.profiles
            where profiles.id = auth.uid() and profiles.role = 'admin'
        )
    );

create policy "Admins can delete storage files"
    on storage.objects for delete
    using (
        bucket_id = 'resources'
        and exists (
            select 1 from public.profiles
            where profiles.id = auth.uid() and profiles.role = 'admin'
        )
    );
