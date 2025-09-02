# ReverseString Edge Function

A simple Supabase Edge Function built with Deno that reverses strings provided as query parameters.

## Purpose

This function demonstrates how to create, document, and test serverless functions within the Supabase ecosystem. It performs a basic string reversal operation, making it an ideal example for understanding Edge Functions fundamentals.

## Input/Output

### Input
- **Method**: GET
- **Query Parameter**: `text` (string, required)
- **Example URL**: `https://your-project.supabase.co/functions/v1/reverseString?text=hello`

### Output
- **Content-Type**: `application/json`
- **Success Response** (200):
  ```json
  {
    "original": "hello",
    "reversed": "olleh",
    "length": 5
  }
  ```
- **Error Response** (400):
  ```json
  {
    "error": "Missing required parameter: text",
    "usage": "Add ?text=your_string_here to the URL"
  }
  ```

## Features

- ✅ String reversal for any UTF-8 text
- ✅ CORS support for cross-origin requests
- ✅ Input validation with helpful error messages
- ✅ Handles special characters, spaces, and Unicode
- ✅ Comprehensive error handling

## Usage Examples

### Basic Usage
```bash
curl "https://your-project.supabase.co/functions/v1/reverseString?text=hello"
```

### With Spaces and Special Characters
```bash
curl "https://your-project.supabase.co/functions/v1/reverseString?text=Hello%20World%21"
```

### Using fetch() in JavaScript
```javascript
const response = await fetch(
  'https://your-project.supabase.co/functions/v1/reverseString?text=hello'
);
const data = await response.json();
console.log(data.reversed); // "olleh"
```

## Development

### Running Locally
```bash
# From the project root
supabase functions serve reverseString --env-file ./supabase/functions/.env.local
```

### Running Tests
```bash
# Navigate to the function directory
cd supabase/functions/reverseString

# Run tests with Deno
deno test --allow-net index_test.ts
```

### Test Coverage
The function includes comprehensive tests covering:
- ✅ Basic string reversal
- ✅ Single character strings
- ✅ Empty string handling
- ✅ Missing parameter validation
- ✅ Complex strings with special characters
- ✅ CORS preflight requests

## Deployment

### Deploy to Supabase
```bash
# From the project root
supabase functions deploy reverseString
```

### Environment Variables
This function doesn't require any environment variables, but if you need to set secrets:
```bash
supabase secrets set SECRET_NAME=secret_value
```

## API Reference

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | The string to reverse |

| Response Field | Type | Description |
|----------------|------|-------------|
| `original` | string | The original input string |
| `reversed` | string | The reversed string |
| `length` | number | Length of the original string |

## Error Codes

| Status | Description |
|--------|-------------|
| 200 | Success - string reversed |
| 400 | Bad Request - missing or invalid text parameter |
| 500 | Internal Server Error - unexpected error occurred |

## Implementation Notes

- Built with Deno's standard library
- Uses URL parsing for query parameter extraction
- Implements proper CORS headers for web compatibility
- Follows Supabase Edge Functions best practices
- Includes comprehensive error handling and validation
