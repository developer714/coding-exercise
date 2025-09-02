import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
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
})
