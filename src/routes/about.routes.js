const { Router } = require('express');
const { About } = require('../models/About');
const { auth } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', auth, (req, res) => {
  try {
    const data = About.info();

    res.json(data);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again!' });
  }
});

module.exports = router;
