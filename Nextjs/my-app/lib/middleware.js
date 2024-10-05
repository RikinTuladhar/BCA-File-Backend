// lib/middleware.js

// Helper function to add CORS headers to the response
export function addCorsHeaders(response) {
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (adjust if necessary)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }
  