const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { getToken } = require('../middlewares/auth.middleware');
const { User } = require('../models/User');

const router = Router();

router.post('/login',
  [
    check('login', 'Incorrect login.').exists(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Validation errors' });
      }

      const { login, password } = req.body;

      const existUser = await User.findOneByLogin(login);

      if (!existUser) {
        return res.status(400).json({ message: 'Email not found!' });
      }

      const isMatch = await bcrypt.compare(password, existUser.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect password, try again!'
        });
      }

      const token = jwt.sign(
        { userName: existUser.name },
        config.get('jwtSecret'),
        { expiresIn: '1h' },
      );

      res.cookie('token', token, {
        maxAge: 3600 * 24,
        httponly: true
      })

      return res.json({ username:  existUser.name});

    } catch (e) {
      res.status(500).json({ message: 'Something went wrong, try again!' });
    }
  });

router.get('/isAuthorize', (req, res) => {
  try {
    const token = getToken(req);

    if (!token) {
      return res.json({
        isAuthorize: false,
        message: 'User not Authorization'
      });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));

    res.json({
      isAuthorize: true,
      username: decoded.userName,
      message: 'Authorize is success'
    });
  } catch (e) {
    res.status(500).json({
      message: e
    });
  }

})

module.exports = router;
