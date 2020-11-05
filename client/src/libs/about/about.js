const { headers } = require('../common');

export const infoData = async () => {
  try {
    const response = await fetch('/api/about', { method: 'GET', headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return { success: true, info: data };
  } catch (e) {
    return { success: false, message: e.message || 'Something went wrong' };
  }
}
