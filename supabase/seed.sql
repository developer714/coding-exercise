-- Seed data for testing
-- Create test users in auth.users table first
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
) VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'email@disca.tech',
    crypt('asdfasdf', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
), (
    'b2c3d4e5-f6a7-8901-bcde-f12345678901'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated', 
    'admin@disca.tech',
    crypt('asdfasdf', gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
);

-- The public.users records will be created automatically via the trigger