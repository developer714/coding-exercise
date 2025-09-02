set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.owns_record_as_user(user_id uuid, OUT success boolean)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
 SET search_path TO 'pg_catalog', 'public', 'pg_temp'
AS $function$
begin
    select id from public.users where auth_user_id = auth.uid() and id = owns_record_as_user.user_id into success;
end;
$function$
;

create policy "select_courses_enrolled"
on "public"."courses_enrolled"
as permissive
for select
to public
using (owns_record_as_user(user_id));




