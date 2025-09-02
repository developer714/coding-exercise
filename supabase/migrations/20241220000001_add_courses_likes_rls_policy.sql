-- Add RLS policy for courses_likes table to ensure users can only see their own liked courses

-- Create policy for SELECT operations on courses_likes
create policy "select_courses_likes"
on "public"."courses_likes"
as permissive
for select
to public
using (owns_record_as_user(user_id));

-- Create policy for INSERT operations on courses_likes  
create policy "insert_courses_likes"
on "public"."courses_likes"
as permissive
for insert
to public
with check (owns_record_as_user(user_id));

-- Create policy for DELETE operations on courses_likes
create policy "delete_courses_likes"
on "public"."courses_likes"
as permissive
for delete
to public
using (owns_record_as_user(user_id));
