create table if not exists push_subs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  endpoint     text not null unique,
  subscription jsonb not null,
  created_at   timestamptz not null default now()
);

alter table push_subs enable row level security;

create policy "own insert" on push_subs for insert with check (auth.uid() = user_id);
create policy "own update" on push_subs for update using (auth.uid() = user_id);
create policy "own select" on push_subs for select using (auth.uid() = user_id);
create policy "own delete" on push_subs for delete using (auth.uid() = user_id);
