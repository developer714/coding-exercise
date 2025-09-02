create table "public"."authors" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "description" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."categories" (
    "id" uuid not null default uuid_generate_v4(),
    "title" character varying(255),
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."channels" (
    "id" uuid not null default uuid_generate_v4(),
    "title" character varying(255),
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."channels_followers" (
    "channel_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."course_authors" (
    "course_id" uuid not null,
    "author_id" uuid not null
);


create table "public"."course_difficulties" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."course_field_of_studies" (
    "course_id" uuid not null,
    "field_of_study_id" uuid not null,
    "course_credit" integer
);


create table "public"."course_licensing_bodies" (
    "course_id" uuid not null,
    "licensing_body_id" uuid not null,
    "course_number" text
);


create table "public"."courses" (
    "id" uuid not null default uuid_generate_v4(),
    "earmark_id" text,
    "title" character varying(255),
    "active" boolean,
    "cost" numeric(10,2),
    "duration" numeric(10,2),
    "irsnumber" text,
    "use_channel_photo" boolean,
    "table_of_contents" text,
    "instructions" text,
    "glossary" text,
    "transcript" text,
    "index" text,
    "description" text,
    "prerequisites" text,
    "course_index" text,
    "post_course_special_offer" text,
    "published_date" timestamp with time zone,
    "featured" boolean,
    "difficulty_id" uuid,
    "category_id" uuid,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."courses_enrolled" (
    "course_id" uuid not null,
    "user_id" uuid not null,
    "start_date" timestamp with time zone,
    "purchase_info" jsonb,
    "non_quiz_entry_completed" jsonb,
    "question_choices" jsonb,
    "quiz_state" jsonb,
    "progress_info" jsonb,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."courses_likes" (
    "user_id" uuid not null,
    "course_id" uuid not null,
    "created_at" timestamp with time zone
);


create table "public"."courses_reviews" (
    "id" uuid not null default uuid_generate_v4(),
    "course_id" uuid,
    "user_id" uuid,
    "stars" integer,
    "review_text" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."episodes" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "description" text,
    "published_date" timestamp with time zone,
    "number" text,
    "duration" text,
    "notes" text,
    "thumbnail" text,
    "link" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."field_of_studies" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."licensing_bodies" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."modules" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "description" text,
    "course_id" uuid,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."presentation_modes" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."questions" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "choices" jsonb
);


create table "public"."shows" (
    "id" uuid not null default uuid_generate_v4(),
    "title" text,
    "active" boolean,
    "description" text,
    "link" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."users" (
    "id" uuid not null default uuid_generate_v4(),
    "email" character varying(255),
    "first_name" character varying(255),
    "last_name" character varying(255),
    "ptin" character varying(255),
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


create table "public"."users_profiles_jobs_active_campaign" (
    "id" uuid not null default uuid_generate_v4(),
    "type" character varying(255),
    "active_campaign_id" uuid,
    "old_email" character varying(255),
    "email" character varying(255),
    "first_name" character varying(255),
    "last_name" character varying(255),
    "fields" jsonb,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


CREATE INDEX active_title_idx ON public.channels USING btree (active, title);

CREATE INDEX admin_idx ON public.channels USING btree (active, updated_at DESC, title);

CREATE INDEX app_idx ON public.courses_reviews USING btree (course_id, user_id, stars DESC);

CREATE UNIQUE INDEX authors_pkey ON public.authors USING btree (id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE INDEX cd_updated_at_idx ON public.course_difficulties USING btree (updated_at DESC);

CREATE UNIQUE INDEX channels_followers_pkey ON public.channels_followers USING btree (channel_id, user_id);

CREATE UNIQUE INDEX channels_pkey ON public.channels USING btree (id);

CREATE INDEX compound_active_publishedat_idx ON public.courses USING btree (active, published_date DESC);

CREATE INDEX compound_user_item_updatedat_idx ON public.channels_followers USING btree (channel_id, user_id, updated_at DESC);

CREATE INDEX compound_user_updated_at_idx ON public.courses_enrolled USING btree (updated_at DESC, user_id);

CREATE UNIQUE INDEX course_authors_pkey ON public.course_authors USING btree (course_id, author_id);

CREATE UNIQUE INDEX course_difficulties_pkey ON public.course_difficulties USING btree (id);

CREATE UNIQUE INDEX course_field_of_studies_pkey ON public.course_field_of_studies USING btree (course_id, field_of_study_id);

CREATE UNIQUE INDEX course_licensing_bodies_pkey ON public.course_licensing_bodies USING btree (course_id, licensing_body_id);

CREATE INDEX course_likes_course_id_idx ON public.courses_likes USING btree (course_id);

CREATE INDEX course_likes_user_id_idx ON public.courses_likes USING btree (user_id);

CREATE INDEX courses_admin_idx ON public.courses USING btree (active, published_date DESC, title, description);

CREATE UNIQUE INDEX courses_enrolled_pkey ON public.courses_enrolled USING btree (course_id, user_id);

CREATE UNIQUE INDEX courses_likes_pkey ON public.courses_likes USING btree (user_id, course_id);

CREATE UNIQUE INDEX courses_pkey ON public.courses USING btree (id);

CREATE UNIQUE INDEX courses_reviews_pkey ON public.courses_reviews USING btree (id);

CREATE INDEX created_at_idx ON public.users USING btree (created_at);

CREATE INDEX enrolled_admin_idx ON public.courses_enrolled USING btree (user_id, course_id, updated_at DESC);

CREATE INDEX enrolled_created_at_idx ON public.courses_enrolled USING btree (created_at);

CREATE INDEX enrolled_updated_at_idx ON public.courses_enrolled USING btree (updated_at DESC);

CREATE INDEX episodes_admin_idx ON public.episodes USING btree (active, updated_at DESC);

CREATE UNIQUE INDEX episodes_pkey ON public.episodes USING btree (id);

CREATE INDEX featured_courses_idx ON public.courses USING btree (featured) WHERE (featured = true);

CREATE UNIQUE INDEX field_of_studies_pkey ON public.field_of_studies USING btree (id);

CREATE UNIQUE INDEX licensing_bodies_pkey ON public.licensing_bodies USING btree (id);

CREATE UNIQUE INDEX modules_pkey ON public.modules USING btree (id);

CREATE UNIQUE INDEX presentation_modes_pkey ON public.presentation_modes USING btree (id);

CREATE INDEX published_date_idx ON public.courses USING btree (published_date DESC);

CREATE INDEX questions_admin_idx ON public.questions USING btree (title, updated_at DESC);

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id);

CREATE INDEX reviews_admin_idx ON public.courses_reviews USING btree (course_id, user_id, updated_at DESC);

CREATE UNIQUE INDEX shows_pkey ON public.shows USING btree (id);

CREATE INDEX title_idx ON public.channels USING btree (title);

CREATE INDEX updated_at_id_idx ON public.users USING btree (updated_at DESC, id);

CREATE INDEX updated_at_idx ON public.users USING btree (updated_at DESC);

CREATE INDEX user_id_idx ON public.courses_enrolled USING btree (user_id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_profiles_jobs_active_campaign_pkey ON public.users_profiles_jobs_active_campaign USING btree (id);

alter table "public"."authors" add constraint "authors_pkey" PRIMARY KEY using index "authors_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."channels" add constraint "channels_pkey" PRIMARY KEY using index "channels_pkey";

alter table "public"."channels_followers" add constraint "channels_followers_pkey" PRIMARY KEY using index "channels_followers_pkey";

alter table "public"."course_authors" add constraint "course_authors_pkey" PRIMARY KEY using index "course_authors_pkey";

alter table "public"."course_difficulties" add constraint "course_difficulties_pkey" PRIMARY KEY using index "course_difficulties_pkey";

alter table "public"."course_field_of_studies" add constraint "course_field_of_studies_pkey" PRIMARY KEY using index "course_field_of_studies_pkey";

alter table "public"."course_licensing_bodies" add constraint "course_licensing_bodies_pkey" PRIMARY KEY using index "course_licensing_bodies_pkey";

alter table "public"."courses" add constraint "courses_pkey" PRIMARY KEY using index "courses_pkey";

alter table "public"."courses_enrolled" add constraint "courses_enrolled_pkey" PRIMARY KEY using index "courses_enrolled_pkey";

alter table "public"."courses_likes" add constraint "courses_likes_pkey" PRIMARY KEY using index "courses_likes_pkey";

alter table "public"."courses_reviews" add constraint "courses_reviews_pkey" PRIMARY KEY using index "courses_reviews_pkey";

alter table "public"."episodes" add constraint "episodes_pkey" PRIMARY KEY using index "episodes_pkey";

alter table "public"."field_of_studies" add constraint "field_of_studies_pkey" PRIMARY KEY using index "field_of_studies_pkey";

alter table "public"."licensing_bodies" add constraint "licensing_bodies_pkey" PRIMARY KEY using index "licensing_bodies_pkey";

alter table "public"."modules" add constraint "modules_pkey" PRIMARY KEY using index "modules_pkey";

alter table "public"."presentation_modes" add constraint "presentation_modes_pkey" PRIMARY KEY using index "presentation_modes_pkey";

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."shows" add constraint "shows_pkey" PRIMARY KEY using index "shows_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users_profiles_jobs_active_campaign" add constraint "users_profiles_jobs_active_campaign_pkey" PRIMARY KEY using index "users_profiles_jobs_active_campaign_pkey";

alter table "public"."channels_followers" add constraint "channels_followers_channel_id_fkey" FOREIGN KEY (channel_id) REFERENCES channels(id) not valid;

alter table "public"."channels_followers" validate constraint "channels_followers_channel_id_fkey";

alter table "public"."channels_followers" add constraint "channels_followers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."channels_followers" validate constraint "channels_followers_user_id_fkey";

alter table "public"."course_authors" add constraint "course_authors_author_id_fkey" FOREIGN KEY (author_id) REFERENCES authors(id) not valid;

alter table "public"."course_authors" validate constraint "course_authors_author_id_fkey";

alter table "public"."course_authors" add constraint "course_authors_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."course_authors" validate constraint "course_authors_course_id_fkey";

alter table "public"."course_field_of_studies" add constraint "course_field_of_studies_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."course_field_of_studies" validate constraint "course_field_of_studies_course_id_fkey";

alter table "public"."course_field_of_studies" add constraint "course_field_of_studies_field_of_study_id_fkey" FOREIGN KEY (field_of_study_id) REFERENCES field_of_studies(id) not valid;

alter table "public"."course_field_of_studies" validate constraint "course_field_of_studies_field_of_study_id_fkey";

alter table "public"."course_licensing_bodies" add constraint "course_licensing_bodies_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."course_licensing_bodies" validate constraint "course_licensing_bodies_course_id_fkey";

alter table "public"."course_licensing_bodies" add constraint "course_licensing_bodies_licensing_body_id_fkey" FOREIGN KEY (licensing_body_id) REFERENCES licensing_bodies(id) not valid;

alter table "public"."course_licensing_bodies" validate constraint "course_licensing_bodies_licensing_body_id_fkey";

alter table "public"."courses" add constraint "courses_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."courses" validate constraint "courses_category_id_fkey";

alter table "public"."courses" add constraint "courses_difficulty_id_fkey" FOREIGN KEY (difficulty_id) REFERENCES course_difficulties(id) not valid;

alter table "public"."courses" validate constraint "courses_difficulty_id_fkey";

alter table "public"."courses_enrolled" add constraint "courses_enrolled_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."courses_enrolled" validate constraint "courses_enrolled_course_id_fkey";

alter table "public"."courses_enrolled" add constraint "courses_enrolled_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."courses_enrolled" validate constraint "courses_enrolled_user_id_fkey";

alter table "public"."courses_likes" add constraint "courses_likes_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."courses_likes" validate constraint "courses_likes_course_id_fkey";

alter table "public"."courses_likes" add constraint "courses_likes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."courses_likes" validate constraint "courses_likes_user_id_fkey";

alter table "public"."courses_reviews" add constraint "courses_reviews_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."courses_reviews" validate constraint "courses_reviews_course_id_fkey";

alter table "public"."courses_reviews" add constraint "courses_reviews_stars_check" CHECK (((stars >= 1) AND (stars <= 5))) not valid;

alter table "public"."courses_reviews" validate constraint "courses_reviews_stars_check";

alter table "public"."courses_reviews" add constraint "courses_reviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."courses_reviews" validate constraint "courses_reviews_user_id_fkey";

alter table "public"."modules" add constraint "modules_course_id_fkey" FOREIGN KEY (course_id) REFERENCES courses(id) not valid;

alter table "public"."modules" validate constraint "modules_course_id_fkey";

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.channels FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.channels_followers FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.course_difficulties FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.courses_likes FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.courses_reviews FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.episodes FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.field_of_studies FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.licensing_bodies FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.modules FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.presentation_modes FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.questions FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.shows FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_timestamps();

CREATE TRIGGER update_timestamps_trigger BEFORE INSERT OR UPDATE ON public.users_profiles_jobs_active_campaign FOR EACH ROW EXECUTE FUNCTION update_timestamps();



