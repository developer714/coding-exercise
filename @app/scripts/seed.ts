import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv-safe'
import 'isomorphic-fetch'

dotenv.config({ path: `${__dirname}/.env` })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * This script will generate fake data for the database.
 *
 * Make sure you run `supabase db reset` before running this script as it is not
 * idempotent.
 */
const run = async () => {
  // TODO Create data
}

run()
