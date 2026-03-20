// Netlify Serverless Function: Send OTP
// Replaces the /send_otp endpoint from app.py

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    // TODO: Implement OTP sending via email service (SendGrid, Mailgun, etc.)
    // Set EMAIL_API_KEY in Netlify dashboard → Site settings → Environment variables
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'OTP endpoint ready. Configure email service in Netlify environment variables.',
        note: 'Set EMAIL_API_KEY and EMAIL_FROM in Netlify dashboard'
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
