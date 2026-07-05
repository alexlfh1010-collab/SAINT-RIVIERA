create extension if not exists pgcrypto;

create type public.user_status as enum ('pending', 'member', 'founder', 'admin');
create type public.order_type as enum ('membership', 'product');
create type public.order_status as enum ('pending', 'paid', 'failed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  whatsapp text,
  status public.user_status not null default 'pending',
  membership_active boolean not null default false,
  credit_balance numeric(12,2) not null default 0,
  referral_code text not null unique default upper(substr(md5(random()::text), 1, 10)),
  infinitepay_customer_id text,
  infinitepay_order_nsu text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  type public.order_type not null,
  status public.order_status not null default 'pending',
  amount integer not null check (amount >= 0),
  paid_amount integer,
  order_nsu text not null unique,
  transaction_nsu text unique,
  infinitepay_slug text,
  receipt_url text,
  capture_method text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric(12,2) not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table public.wishlist (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.wishlist enable row level security;

create policy "Perfil próprio visível" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Pedidos próprios visíveis" on public.orders for select to authenticated using ((select auth.uid()) = user_id);
create policy "Créditos próprios visíveis" on public.credit_ledger for select to authenticated using ((select auth.uid()) = user_id);
create policy "Wishlist própria" on public.wishlist for select to authenticated using ((select auth.uid()) = user_id);
create policy "Adicionar à wishlist" on public.wishlist for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Remover da wishlist" on public.wishlist for delete to authenticated using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, whatsapp, status, membership_active, credit_balance)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'whatsapp',
    'pending',
    false,
    0
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.activate_membership(p_user_id uuid, p_order_nsu text)
returns public.user_status
language plpgsql
security definer set search_path = public
as $$
declare
  founder_total integer;
  new_status public.user_status;
begin
  perform pg_advisory_xact_lock(8262026);
  select count(*) into founder_total from profiles where status = 'founder';
  new_status := case when founder_total < 100 then 'founder'::user_status else 'member'::user_status end;

  update profiles set
    membership_active = true,
    status = new_status,
    credit_balance = credit_balance + 30.00,
    infinitepay_order_nsu = p_order_nsu,
    updated_at = now()
  where id = p_user_id and membership_active = false;

  if found then
    insert into credit_ledger (user_id, amount, description)
    values (p_user_id, 30.00, 'Crédito mensal Private Society');
  end if;
  return new_status;
end;
$$;

revoke all on function public.activate_membership(uuid, text) from public, anon, authenticated;
grant execute on function public.activate_membership(uuid, text) to service_role;
