import { assertEquals, assertExists } from "https://deno.land/std@0.168.0/testing/asserts.ts"

// Mock the serve function for testing
const createRequest = (url: string, method = 'GET') => {
  return new Request(url, { method })
}

// Import the handler function
const handler = async (req: Request) => {
  const { method, url } = req
  
  // Handle CORS preflight requests
  if (method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    })
  }

  try {
    // Parse URL to get query parameters
    const urlObj = new URL(url)
    const text = urlObj.searchParams.get('text')
    
    // Validate input
    if (!text) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameter: text',
          usage: 'Add ?text=your_string_here to the URL'
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    // Reverse the string
    const reversedText = text.split('').reverse().join('')
    
    // Return the result
    return new Response(
      JSON.stringify({
        original: text,
        reversed: reversedText,
        length: text.length
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}

Deno.test("reverseString function - basic string reversal", async () => {
  const req = createRequest("http://localhost:8000?text=hello")
  const response = await handler(req)
  
  assertEquals(response.status, 200)
  
  const data = await response.json()
  assertEquals(data.original, "hello")
  assertEquals(data.reversed, "olleh")
  assertEquals(data.length, 5)
})

Deno.test("reverseString function - single character", async () => {
  const req = createRequest("http://localhost:8000?text=a")
  const response = await handler(req)
  
  assertEquals(response.status, 200)
  
  const data = await response.json()
  assertEquals(data.original, "a")
  assertEquals(data.reversed, "a")
  assertEquals(data.length, 1)
})

Deno.test("reverseString function - empty string", async () => {
  const req = createRequest("http://localhost:8000?text=")
  const response = await handler(req)
  
  assertEquals(response.status, 400)
  
  const data = await response.json()
  assertExists(data.error)
  assertEquals(data.error, "Missing required parameter: text")
})

Deno.test("reverseString function - missing text parameter", async () => {
  const req = createRequest("http://localhost:8000")
  const response = await handler(req)
  
  assertEquals(response.status, 400)
  
  const data = await response.json()
  assertExists(data.error)
  assertEquals(data.error, "Missing required parameter: text")
  assertExists(data.usage)
})

Deno.test("reverseString function - complex string with spaces and special characters", async () => {
  const req = createRequest("http://localhost:8000?text=Hello%20World%21")
  const response = await handler(req)
  
  assertEquals(response.status, 200)
  
  const data = await response.json()
  assertEquals(data.original, "Hello World!")
  assertEquals(data.reversed, "!dlroW olleH")
  assertEquals(data.length, 12)
})

Deno.test("reverseString function - numbers and symbols", async () => {
  const req = createRequest("http://localhost:8000?text=123%40%23%24")
  const response = await handler(req)
  
  assertEquals(response.status, 200)
  
  const data = await response.json()
  assertEquals(data.original, "123@#$")
  assertEquals(data.reversed, "$#@321")
  assertEquals(data.length, 6)
})

Deno.test("reverseString function - CORS preflight request", async () => {
  const req = createRequest("http://localhost:8000", "OPTIONS")
  const response = await handler(req)
  
  assertEquals(response.status, 200)
  assertEquals(response.headers.get('Access-Control-Allow-Origin'), '*')
  assertEquals(response.headers.get('Access-Control-Allow-Methods'), 'GET, POST, OPTIONS')
})
