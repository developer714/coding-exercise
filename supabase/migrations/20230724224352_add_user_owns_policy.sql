alter table "public"."users" add column "auth_user_id" uuid;

alter table "public"."users" add constraint "users_auth_user_id_fkey" FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_auth_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.owns_record(user_id uuid, OUT success boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'pg_catalog', 'public', 'pg_temp'
AS $function$
begin
    select auth.uid() = user_id into success;
end;
$function$
;

create policy "select_users"
on "public"."users"
as permissive
for select
to public
using (owns_record(auth_user_id));




