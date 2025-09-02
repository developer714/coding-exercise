alter table "public"."users" drop column "email";

CREATE UNIQUE INDEX auth_user_id_unique ON public.users USING btree (auth_user_id);

alter table "public"."users" add constraint "auth_user_id_unique" UNIQUE using index "auth_user_id_unique";

create policy "update_users"
on "public"."users"
as permissive
for update
to public
using (owns_record(auth_user_id));




