set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_auth_user_id()
 RETURNS trigger
 SECURITY DEFINER
 LANGUAGE plpgsql
AS $function$
begin
    insert into public.users (auth_user_id) values (new.id);
    return null;
end;
$function$
;

CREATE TRIGGER set_auth_user_id_trigger AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION set_auth_user_id();



