import { exec } from 'child_process'
import * as dotenv from 'dotenv-safe'

dotenv.config({ path: `${__dirname}/.env` })

let hasRun = false

const execute = async (script: 'stop' | 'start'): Promise<[string, string] | null> => {
  const execOptions = { cwd: `${__dirname}/../..` }
  let anonKey = null
  let serviceKey = null
  const child = exec(`supabase ${script}`, execOptions).stdout.on('data', function (data) {
    console.log(data)
    if (script === 'stop') return

    // search for the "anon key" in the output
    const match = data.match(/anon key: (.*)/)
    if (match) {
      // if found, set the anonKey variable
      anonKey = match[1]
    }

    // Search for the "service_role key" in the output
    const serviceRoleMatch = data.match(/service_role key: (.*)/)
    if (serviceRoleMatch) {
      // if found, set the anonKey variable
      serviceKey = serviceRoleMatch[1]
    }
  })

  return new Promise((resolve) => {
    child.on('close', () => {
      if (script === 'stop') {
        resolve(null)
        return
      }
      resolve([anonKey, serviceKey])
    })
  })
}

export default async () => {
  if (hasRun) return

  hasRun = true
  await execute('stop')
  const [anonKey, serviceKey] = await execute('start')
  if (!process.env.SUPABASE_ANON_KEY) {
    console.log('Did not find SUPABASE_ANON_KEY in .env, setting it to', anonKey)
    process.env.SUPABASE_ANON_KEY = anonKey
  }
  if (!process.env.SUPABASE_SERVICE_KEY) {
    console.log('Did not find SUPABASE_SERVICE_KEY in .env, setting it to', serviceKey)
    process.env.SUPABASE_SERVICE_KEY = serviceKey
  }
}
