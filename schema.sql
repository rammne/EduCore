-- Create courses table
create table courses (
  id uuid default gen_random_uuid() primary key,
  code text not null,
  title text not null,
  professor text not null,
  syllabus text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create announcements table
create table announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create activities table
create table activities (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references courses(id) on delete cascade not null,
  title text not null,
  description text,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create students table
create table students (
  id uuid default gen_random_uuid() primary key,
  student_id text not null unique,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
