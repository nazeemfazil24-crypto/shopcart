// Netlify Serverless Function: Admin Orders API
// Replaces the /admin/orders endpoint from server.py

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const ordersPath = path.join(__dirname, '..', '..', 'order_history.json');

  if (event.httpMethod === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
      return { statusCode: 200, headers, body: JSON.stringify(Array.isArray(data) ? data : []) };
    } catch (err) {
      return { statusCode: 200, headers, body: JSON.stringify([]) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      fs.writeFileSync(ordersPath, JSON.stringify(data || [], null, 2));
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    } catch (err) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: err.message })
      };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
