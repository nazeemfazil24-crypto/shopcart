// Netlify Serverless Function: Catch-all API handler
// Handles /api/* routes that were previously served by app.py (FastAPI)
// Maps to the various endpoints: login, register, OTP, seller, etc.

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Extract the API path (everything after /api/)
  const apiPath = event.path.replace('/.netlify/functions/api/', '').replace('/api/', '');

  // Route to appropriate handler
  switch (apiPath) {
    case 'config':
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          platform: 'netlify',
          google_auth_enabled: !!process.env.GOOGLE_CLIENT_ID,
          google_client_id: process.env.GOOGLE_CLIENT_ID || ''
        })
      };

    case 'login':
      return handleLogin(event, headers);

    case 'register':
      return handleRegister(event, headers);

    case 'me':
      return handleMe(event, headers);

    case 'send-login-otp':
    case 'verify-login-otp':
    case 'verify-registration-otp':
    case 'resend-verification-email':
      return handleOTP(apiPath, event, headers);

    case 'upgrade-to-seller':
      return handleUpgradeToSeller(event, headers);

    case 'seller/products':
      return handleSellerProducts(event, headers);

    case 'request-account-deletion':
    case 'verify-deletion-otp':
    case 'cancel-account-deletion':
      return handleAccountDeletion(apiPath, event, headers);

    case 'auth/google':
      return handleGoogleAuth(event, headers);

    default:
      // Check for dynamic routes like /api/seller/products/:id
      if (apiPath.startsWith('seller/products/')) {
        return handleSellerProducts(event, headers);
      }
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: `API endpoint /${apiPath} not found` })
      };
  }
};

// ── Placeholder handlers ──
// These return appropriate responses so the frontend works.
// Connect to your database (e.g., Supabase, PlanetScale, MongoDB Atlas)
// via environment variables for full functionality.

async function handleLogin(event, headers) {
  const body = JSON.parse(event.body || '{}');
  // TODO: Connect to your database for real authentication
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Login endpoint ready. Configure database connection in Netlify environment variables.',
      note: 'Set DATABASE_URL in Netlify dashboard → Site settings → Environment variables'
    })
  };
}

async function handleRegister(event, headers) {
  const body = JSON.parse(event.body || '{}');
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Registration endpoint ready. Configure database connection in Netlify environment variables.'
    })
  };
}

async function handleMe(event, headers) {
  const authHeader = event.headers['authorization'] || '';
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'User profile endpoint ready. Configure JWT verification in Netlify environment variables.',
      note: 'Set SECRET_KEY in Netlify dashboard → Site settings → Environment variables'
    })
  };
}

async function handleOTP(action, event, headers) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: `OTP endpoint (${action}) ready. Configure email service (e.g., SendGrid, Mailgun) in Netlify environment variables.`,
      note: 'Set EMAIL_API_KEY and EMAIL_FROM in Netlify dashboard → Site settings → Environment variables'
    })
  };
}

async function handleUpgradeToSeller(event, headers) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Seller upgrade endpoint ready. Configure database connection in Netlify environment variables.'
    })
  };
}

async function handleSellerProducts(event, headers) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Seller products endpoint ready. Configure database connection in Netlify environment variables.',
      products: []
    })
  };
}

async function handleAccountDeletion(action, event, headers) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: `Account deletion endpoint (${action}) ready. Configure database connection in Netlify environment variables.`
    })
  };
}

async function handleGoogleAuth(event, headers) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Google Auth endpoint ready. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Netlify environment variables.'
    })
  };
}
