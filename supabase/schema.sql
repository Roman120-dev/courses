-- Minimal schema for chess MVP
create table if not exists profiles (
  id uuid primary key default auth.uid(),
  username text unique,
  avatar_url text,
  rating_elo int default 1200,
  created_at timestamp with time zone default now()
);

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  white_id uuid references profiles(id),
  black_id uuid references profiles(id),
  fen text,
  status text check (status in ('pending','active','finished')) default 'pending',
  result text, -- '1-0' | '0-1' | '1/2-1/2'
  created_at timestamp with time zone default now(),
  started_at timestamp with time zone,
  finished_at timestamp with time zone
);

create table if not exists moves (
  id bigserial primary key,
  game_id uuid references games(id) on delete cascade,
  ply int not null,
  san text,
  from_square text,
  to_square text,
  promotion text,
  fen_after text,
  made_by uuid references profiles(id),
  created_at timestamp with time zone default now()
);

create index if not exists idx_moves_game_id on moves(game_id);