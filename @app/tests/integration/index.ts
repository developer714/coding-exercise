import { Pool, PoolClient } from 'pg'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let pool: Pool
let client: PoolClient
const anonClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false
  }
})
const serviceClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
  auth: {
    persistSession: false
  }
})

const TEST_EMAIL_DOMAIN = '@disca.tech'

beforeAll(async () => {
  pool = new Pool({ connectionString: process.env.DATABASE_URL })
  client = await pool.connect()
})

beforeEach(async () => {
  // Clear out the database except for the seed data
  const usersToDelete = await client.query(`select id from auth.users where email like '%${TEST_EMAIL_DOMAIN}'`)
  const userIds = usersToDelete.rows.map((u) => u.id)
  await client.query(`delete from public.users where auth_user_id = ANY($1)`, [userIds])
  await client.query(`delete from auth.users where id = ANY($1)`, [userIds])
})

const login = async (user: 'user' | 'admin' | string): Promise<[SupabaseClient, string]> => {
  const email = user.includes('@') ? user : `${user}${TEST_EMAIL_DOMAIN}`
  const {
    data: { session }
  } = await anonClient.auth.signInWithPassword({
    email,
    password: 'asdfasdf'
  })
  return [
    createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    }),
    session.user.id
  ]
}

describe('users', () => {
  // Create some test users, then login as one of them and try to view the other one's data (should fail)
  it('users can only view their own data', async () => {
    // Create two test users
    const user1Email = `testuser1${TEST_EMAIL_DOMAIN}`
    const user2Email = `testuser2${TEST_EMAIL_DOMAIN}`
    
    // Sign up first user
    const { data: user1Auth } = await anonClient.auth.signUp({
      email: user1Email,
      password: 'asdfasdf'
    })
    
    // Sign up second user
    const { data: user2Auth } = await anonClient.auth.signUp({
      email: user2Email,
      password: 'asdfasdf'
    })
    
    // Login as first user
    const [user1Client, user1Id] = await login('testuser1')
    
    // Try to get all users - should only see own data due to RLS
    const { data: users, error } = await user1Client
      .from('users')
      .select('*')
    
    expect(error).toBeNull()
    expect(users).toHaveLength(1)
    expect(users[0].auth_user_id).toBe(user1Auth.user?.id)
    
    // Login as second user
    const [user2Client, user2Id] = await login('testuser2')
    
    // Try to get all users - should only see own data
    const { data: users2, error: error2 } = await user2Client
      .from('users')
      .select('*')
    
    expect(error2).toBeNull()
    expect(users2).toHaveLength(1)
    expect(users2[0].auth_user_id).toBe(user2Auth.user?.id)
    
    // Verify user1 cannot see user2's data by trying to access specific record
    const { data: user2Data, error: accessError } = await user1Client
      .from('users')
      .select('*')
      .eq('auth_user_id', user2Auth.user?.id)
    
    expect(accessError).toBeNull()
    expect(user2Data).toHaveLength(0) // Should not see other user's data
  })

  // use the serviceClient and select all users
  it('super admins should be able to view all users', async () => {
    // Create a test user first
    const testEmail = `testadmin${TEST_EMAIL_DOMAIN}`
    const { data: userData } = await anonClient.auth.signUp({
      email: testEmail,
      password: 'asdfasdf'
    })
    
    // Use service client (bypasses RLS) to get all users
    const { data: allUsers, error } = await serviceClient
      .from('users')
      .select('*')
    
    expect(error).toBeNull()
    expect(allUsers).toBeDefined()
    expect(allUsers.length).toBeGreaterThan(0)
    
    // Verify we can see the test user we just created
    const testUser = allUsers.find(user => user.auth_user_id === userData.user?.id)
    expect(testUser).toBeDefined()
  })
})

describe('courses_likes RLS policy', () => {
  it('users can only see their own liked courses', async () => {
    // Create two test users
    const user1Email = `liketest1${TEST_EMAIL_DOMAIN}`
    const user2Email = `liketest2${TEST_EMAIL_DOMAIN}`
    
    // Sign up users
    const { data: user1Auth } = await anonClient.auth.signUp({
      email: user1Email,
      password: 'asdfasdf'
    })
    
    const { data: user2Auth } = await anonClient.auth.signUp({
      email: user2Email,
      password: 'asdfasdf'
    })

    // Get user IDs from public.users table
    const { rows: user1Rows } = await client.query('select id from public.users where auth_user_id = $1', [user1Auth.user?.id])
    const { rows: user2Rows } = await client.query('select id from public.users where auth_user_id = $1', [user2Auth.user?.id])
    
    const user1Id = user1Rows[0].id
    const user2Id = user2Rows[0].id

    // Create a test course
    const { rows: courseRows } = await client.query(`
      INSERT INTO courses (title, active) 
      VALUES ('Test Course for Likes', true) 
      RETURNING id
    `)
    const courseId = courseRows[0].id

    // User1 likes the course (using service client to bypass RLS for setup)
    await serviceClient
      .from('courses_likes')
      .insert({ user_id: user1Id, course_id: courseId })

    // User2 likes the course (using service client to bypass RLS for setup)  
    await serviceClient
      .from('courses_likes')
      .insert({ user_id: user2Id, course_id: courseId })

    // Login as user1 and try to see liked courses
    const [user1Client] = await login(user1Email)
    const { data: user1Likes, error: user1Error } = await user1Client
      .from('courses_likes')
      .select('*')

    expect(user1Error).toBeNull()
    expect(user1Likes).toHaveLength(1)
    expect(user1Likes[0].user_id).toBe(user1Id)

    // Login as user2 and try to see liked courses
    const [user2Client] = await login(user2Email)
    const { data: user2Likes, error: user2Error } = await user2Client
      .from('courses_likes')
      .select('*')

    expect(user2Error).toBeNull()
    expect(user2Likes).toHaveLength(1)
    expect(user2Likes[0].user_id).toBe(user2Id)

    // Verify user1 cannot see user2's likes by trying to query specific record
    const { data: crossUserLikes, error: crossError } = await user1Client
      .from('courses_likes')
      .select('*')
      .eq('user_id', user2Id)

    expect(crossError).toBeNull()
    expect(crossUserLikes).toHaveLength(0) // Should not see other user's likes
  })

  it('users cannot see another users liked courses', async () => {
    // Create test users
    const user1Email = `privacy1${TEST_EMAIL_DOMAIN}`
    const user2Email = `privacy2${TEST_EMAIL_DOMAIN}`
    
    const { data: user1Auth } = await anonClient.auth.signUp({
      email: user1Email,
      password: 'asdfasdf'
    })
    
    const { data: user2Auth } = await anonClient.auth.signUp({
      email: user2Email,
      password: 'asdfasdf'
    })

    // Get user IDs
    const { rows: user1Rows } = await client.query('select id from public.users where auth_user_id = $1', [user1Auth.user?.id])
    const { rows: user2Rows } = await client.query('select id from public.users where auth_user_id = $1', [user2Auth.user?.id])
    
    const user1Id = user1Rows[0].id
    const user2Id = user2Rows[0].id

    // Create test courses
    const { rows: course1Rows } = await client.query(`
      INSERT INTO courses (title, active) 
      VALUES ('Privacy Test Course 1', true) 
      RETURNING id
    `)
    const { rows: course2Rows } = await client.query(`
      INSERT INTO courses (title, active) 
      VALUES ('Privacy Test Course 2', true) 
      RETURNING id
    `)
    
    const course1Id = course1Rows[0].id
    const course2Id = course2Rows[0].id

    // User1 likes course1, User2 likes course2 (using service client)
    await serviceClient.from('courses_likes').insert({ user_id: user1Id, course_id: course1Id })
    await serviceClient.from('courses_likes').insert({ user_id: user2Id, course_id: course2Id })

    // Login as user1 and verify they only see their own likes
    const [user1Client] = await login(user1Email)
    const { data: allLikes } = await user1Client
      .from('courses_likes')
      .select('*')

    expect(allLikes).toHaveLength(1)
    expect(allLikes[0].user_id).toBe(user1Id)
    expect(allLikes[0].course_id).toBe(course1Id)

    // Verify they cannot see user2's likes even when querying by course
    const { data: course2Likes } = await user1Client
      .from('courses_likes') 
      .select('*')
      .eq('course_id', course2Id)

    expect(course2Likes).toHaveLength(0) // Should not see other user's likes
  })
})

describe('registration', () => {
  it('can self register', async () => {
    const email = `test${TEST_EMAIL_DOMAIN}`
    await anonClient.auth.signUp({
      email,
      password: 'asdfasdf'
    })
    const { rows: users } = await client.query('select id from auth.users where email = $1', [email])
    expect(users.length).toBe(1)
    const { rows: userProfiles } = await client.query('select * from public.users where auth_user_id = $1', [
      users[0].id
    ])
    expect(userProfiles.length).toBe(1)
    expect(userProfiles[0].auth_user_id).toBe(users[0].id)
  })
})

afterAll(async () => {
  await client.release()
  await pool.end()
})
