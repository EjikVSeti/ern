const { headers } = require('../common');

export const isAuthorize = async () => {
  try {
    const response = await fetch('/api/auth/isAuthorize', { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return { success: true, ...data, isAuthenticated: data.isAuthorize };
  } catch (e) {
    return { success: false, message: e.message || 'Something went wrong' };
  }
}

export const userLogin = async (body) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      credentials: 'include'
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return { success: true, ...data, isAuthenticated: true };
  } catch (e) {
    return { success: false, message: e.message || 'Something went wrong' };
  }

}

