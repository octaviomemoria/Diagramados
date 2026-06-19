create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

create type public.workspace_role as enum ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');
create type public.project_status as enum ('DRAFT', 'ACTIVE', 'ARCHIVED');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.workspace_role not null default 'VIEWER',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create or replace function private.current_workspace_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select wm.workspace_id from public.workspace_members wm
  where wm.user_id = (select auth.uid())
  order by wm.created_at asc limit 1
$$;

create or replace function private.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.workspace_id = target_workspace_id and wm.user_id = (select auth.uid())
  )
$$;

create or replace function private.can_edit_workspace(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.workspace_members wm
    where wm.workspace_id = target_workspace_id
      and wm.user_id = (select auth.uid())
      and wm.role in ('OWNER', 'ADMIN', 'EDITOR')
  )
$$;

grant execute on function private.current_workspace_id() to authenticated;
grant execute on function private.is_workspace_member(uuid) to authenticated;
grant execute on function private.can_edit_workspace(uuid) to authenticated;

create table public.companies (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  segment text,
  employee_count integer check (employee_count is null or employee_count >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.org_charts (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  company_id text not null references public.companies(id) on delete restrict,
  name text not null,
  description text,
  status public.project_status not null default 'DRAFT',
  revision integer not null default 1,
  viewport jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.org_chart_nodes (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  org_chart_id text not null references public.org_charts(id) on delete cascade,
  title text not null,
  occupant_name text,
  department text,
  status text not null default 'OPEN',
  reports_to_node_id text references public.org_chart_nodes(id) on delete set null,
  notes text,
  color text,
  position_x double precision not null default 0,
  position_y double precision not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.org_chart_edges (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  org_chart_id text not null references public.org_charts(id) on delete cascade,
  source_node_id text not null references public.org_chart_nodes(id) on delete cascade,
  target_node_id text not null references public.org_chart_nodes(id) on delete cascade,
  label text,
  created_at timestamptz not null default now(),
  unique (org_chart_id, source_node_id, target_node_id),
  unique (org_chart_id, target_node_id)
);

create table public.process_maps (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  company_id text not null references public.companies(id) on delete restrict,
  name text not null,
  description text,
  department text,
  process_owner text,
  status public.project_status not null default 'DRAFT',
  revision integer not null default 1,
  viewport jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.process_nodes (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  process_map_id text not null references public.process_maps(id) on delete cascade,
  type text not null,
  title text not null,
  description text,
  department text,
  responsible_role text,
  notes text,
  position_x double precision not null default 0,
  position_y double precision not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.process_edges (
  id text primary key,
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  process_map_id text not null references public.process_maps(id) on delete cascade,
  source_node_id text not null references public.process_nodes(id) on delete cascade,
  target_node_id text not null references public.process_nodes(id) on delete cascade,
  label text,
  source_handle text,
  target_handle text,
  created_at timestamptz not null default now(),
  unique (process_map_id, source_node_id, target_node_id)
);

create table public.ai_generation_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null default private.current_workspace_id() references public.workspaces(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  generation_type text not null,
  provider text not null default 'MOCK',
  input_excerpt text,
  status text not null,
  created_at timestamptz not null default now()
);

create index companies_workspace_idx on public.companies(workspace_id) where deleted_at is null;
create index org_charts_workspace_idx on public.org_charts(workspace_id, company_id) where deleted_at is null;
create index org_chart_nodes_chart_idx on public.org_chart_nodes(org_chart_id);
create index process_maps_workspace_idx on public.process_maps(workspace_id, company_id) where deleted_at is null;
create index process_nodes_map_idx on public.process_nodes(process_map_id);

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.companies enable row level security;
alter table public.org_charts enable row level security;
alter table public.org_chart_nodes enable row level security;
alter table public.org_chart_edges enable row level security;
alter table public.process_maps enable row level security;
alter table public.process_nodes enable row level security;
alter table public.process_edges enable row level security;
alter table public.ai_generation_logs enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy profiles_update_own on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy workspaces_select_member on public.workspaces for select to authenticated using ((select private.is_workspace_member(id)));
create policy workspaces_update_editor on public.workspaces for update to authenticated using ((select private.can_edit_workspace(id))) with check ((select private.can_edit_workspace(id)));
create policy members_select_member on public.workspace_members for select to authenticated using ((select private.is_workspace_member(workspace_id)));

create policy companies_select on public.companies for select to authenticated using ((select private.is_workspace_member(workspace_id)) and deleted_at is null);
create policy companies_insert on public.companies for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy companies_update on public.companies for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy companies_delete on public.companies for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));

create policy org_charts_select on public.org_charts for select to authenticated using ((select private.is_workspace_member(workspace_id)) and deleted_at is null);
create policy org_charts_insert on public.org_charts for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy org_charts_update on public.org_charts for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy org_charts_delete on public.org_charts for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));

create policy org_nodes_select on public.org_chart_nodes for select to authenticated using ((select private.is_workspace_member(workspace_id)));
create policy org_nodes_insert on public.org_chart_nodes for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy org_nodes_update on public.org_chart_nodes for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy org_nodes_delete on public.org_chart_nodes for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));
create policy org_edges_select on public.org_chart_edges for select to authenticated using ((select private.is_workspace_member(workspace_id)));
create policy org_edges_insert on public.org_chart_edges for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy org_edges_update on public.org_chart_edges for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy org_edges_delete on public.org_chart_edges for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));

create policy processes_select on public.process_maps for select to authenticated using ((select private.is_workspace_member(workspace_id)) and deleted_at is null);
create policy processes_insert on public.process_maps for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy processes_update on public.process_maps for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy processes_delete on public.process_maps for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));
create policy process_nodes_select on public.process_nodes for select to authenticated using ((select private.is_workspace_member(workspace_id)));
create policy process_nodes_insert on public.process_nodes for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy process_nodes_update on public.process_nodes for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy process_nodes_delete on public.process_nodes for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));
create policy process_edges_select on public.process_edges for select to authenticated using ((select private.is_workspace_member(workspace_id)));
create policy process_edges_insert on public.process_edges for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)));
create policy process_edges_update on public.process_edges for update to authenticated using ((select private.can_edit_workspace(workspace_id))) with check ((select private.can_edit_workspace(workspace_id)));
create policy process_edges_delete on public.process_edges for delete to authenticated using ((select private.can_edit_workspace(workspace_id)));
create policy ai_logs_select on public.ai_generation_logs for select to authenticated using ((select private.is_workspace_member(workspace_id)));
create policy ai_logs_insert on public.ai_generation_logs for insert to authenticated with check ((select private.can_edit_workspace(workspace_id)) and user_id = (select auth.uid()));

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare new_workspace_id uuid;
begin
  insert into public.profiles(id, full_name) values (new.id, new.raw_user_meta_data ->> 'full_name');
  insert into public.workspaces(name, owner_id) values (coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), 'Meu workspace'), new.id) returning id into new_workspace_id;
  insert into public.workspace_members(workspace_id, user_id, role) values (new_workspace_id, new.id, 'OWNER');
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute function private.handle_new_user();

create or replace function private.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated before update on public.profiles for each row execute function private.set_updated_at();
create trigger workspaces_updated before update on public.workspaces for each row execute function private.set_updated_at();
create trigger companies_updated before update on public.companies for each row execute function private.set_updated_at();
create trigger org_charts_updated before update on public.org_charts for each row execute function private.set_updated_at();
create trigger process_maps_updated before update on public.process_maps for each row execute function private.set_updated_at();

grant select, insert, update, delete on public.profiles, public.workspaces, public.workspace_members, public.companies, public.org_charts, public.org_chart_nodes, public.org_chart_edges, public.process_maps, public.process_nodes, public.process_edges, public.ai_generation_logs to authenticated;

create or replace function public.save_org_chart_snapshot(
  p_org_chart_id text,
  p_expected_revision integer,
  p_nodes jsonb,
  p_edges jsonb,
  p_viewport jsonb default null
)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare next_revision integer;
begin
  update public.org_charts
    set revision = revision + 1, viewport = p_viewport, updated_at = now()
    where id = p_org_chart_id and revision = p_expected_revision
    returning revision into next_revision;
  if next_revision is null then raise exception 'REVISION_CONFLICT'; end if;

  delete from public.org_chart_edges where org_chart_id = p_org_chart_id;
  delete from public.org_chart_nodes where org_chart_id = p_org_chart_id;

  insert into public.org_chart_nodes(id, org_chart_id, title, occupant_name, department, status, notes, color, position_x, position_y)
  select x.id, p_org_chart_id, x.title, x.occupant_name, x.department, x.status, x.notes, x.color, x.position_x, x.position_y
  from jsonb_to_recordset(p_nodes) as x(id text, title text, occupant_name text, department text, status text, reports_to_node_id text, notes text, color text, position_x double precision, position_y double precision);

  update public.org_chart_nodes n set reports_to_node_id = x.reports_to_node_id
  from jsonb_to_recordset(p_nodes) as x(id text, reports_to_node_id text)
  where n.id = x.id and n.org_chart_id = p_org_chart_id and x.reports_to_node_id is not null;

  insert into public.org_chart_edges(id, org_chart_id, source_node_id, target_node_id, label)
  select x.id, p_org_chart_id, x.source_node_id, x.target_node_id, x.label
  from jsonb_to_recordset(p_edges) as x(id text, source_node_id text, target_node_id text, label text);
  return next_revision;
end;
$$;

create or replace function public.save_process_snapshot(
  p_process_map_id text,
  p_expected_revision integer,
  p_nodes jsonb,
  p_edges jsonb,
  p_viewport jsonb default null
)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare next_revision integer;
begin
  update public.process_maps
    set revision = revision + 1, viewport = p_viewport, updated_at = now()
    where id = p_process_map_id and revision = p_expected_revision
    returning revision into next_revision;
  if next_revision is null then raise exception 'REVISION_CONFLICT'; end if;

  delete from public.process_edges where process_map_id = p_process_map_id;
  delete from public.process_nodes where process_map_id = p_process_map_id;
  insert into public.process_nodes(id, process_map_id, type, title, description, department, responsible_role, notes, position_x, position_y)
  select x.id, p_process_map_id, x.type, x.title, x.description, x.department, x.responsible_role, x.notes, x.position_x, x.position_y
  from jsonb_to_recordset(p_nodes) as x(id text, type text, title text, description text, department text, responsible_role text, notes text, position_x double precision, position_y double precision);
  insert into public.process_edges(id, process_map_id, source_node_id, target_node_id, label, source_handle, target_handle)
  select x.id, p_process_map_id, x.source_node_id, x.target_node_id, x.label, x.source_handle, x.target_handle
  from jsonb_to_recordset(p_edges) as x(id text, source_node_id text, target_node_id text, label text, source_handle text, target_handle text);
  return next_revision;
end;
$$;

grant execute on function public.save_org_chart_snapshot(text, integer, jsonb, jsonb, jsonb) to authenticated;
grant execute on function public.save_process_snapshot(text, integer, jsonb, jsonb, jsonb) to authenticated;
