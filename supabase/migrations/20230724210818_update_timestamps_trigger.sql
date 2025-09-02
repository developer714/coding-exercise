set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_timestamps()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := CURRENT_TIMESTAMP;
    NEW.updated_at := CURRENT_TIMESTAMP;
  ELSIF TG_OP = 'UPDATE' THEN
    NEW.created_at := OLD.created_at;
    NEW.updated_at := CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$function$
;



