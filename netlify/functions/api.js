// netlify/functions/api.js (CommonJS)
exports.handler = async (event) => {
  const { httpMethod, path, body } = event;
  const cleanPath = path.replace('/.netlify/functions/api', '');
  const json = body ? JSON.parse(body) : {};

  // Mock: /auth/login
  if (cleanPath === '/auth/login' && httpMethod === 'POST') {
    const { email } = json;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: 'mock-token-123',
        refreshToken: 'mock-refresh-456',
        user: { firstName: 'Nodum', lastName: 'User', email }
      })
    };
  }

  // Mock: /auth/register
  if (cleanPath === '/auth/register' && httpMethod === 'POST') {
    const { firstName, lastName, email } = json;
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        firstName,
        lastName,
        email
      })
    };
  }

  return { statusCode: 404, body: 'Not found' };
};
