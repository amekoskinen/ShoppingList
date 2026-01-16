const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const passport = require('passport');

const login = require('../controllers/login')

router.get('/', (req, res) => {
  res.redirect('login')
});
router.get('/login', (req, res) => {
  res.render('./login/login')
});
router.get('/register', (req, res) => {
  res.render('./login/register')
});

router.post('/register', catchAsync(login.registerUser));

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login.loginUser)

router.post('/logout', login.logoutUser);

module.exports = router;