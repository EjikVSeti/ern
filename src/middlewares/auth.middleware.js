const jwt = require('jsonwebtoken');
const config = require('config');

const getToken = (req) => {
  return (req.headers.authorization && req.headers.authorization.split(' ')[1]) ||
    (req.cookies && req.cookies.token);
}

const auth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({
        message: 'User not Authorization'
      });
    }

    req.user = jwt.verify(token, config.get('jwtSecret'));
    next();

  } catch (e) {
    return res.status(401).json({
      message: 'User not Authorization'
    });
  }
}

module.exports = {
  auth,
  getToken
}
