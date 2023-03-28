const express = require('express');
const authController = require('../controllers/authController');
//const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');


router.post('/register', async (req, res) => {
    try {
      const { name, email, password,date } = req.body;
      //const hashedPassword = await bcrypt.hash(password, 10);
      //const user = new User({ name, email, password: hashedPassword, date });
      const user = new User({ name, email, password, date });
      await user.save();
      res.redirect('/login');
    } catch (error) {
      console.log(error);
      res.render('register', { message: 'Error creating user' });
    }
  });

router.post('/login', authController.login);

router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);

module.exports = router;
