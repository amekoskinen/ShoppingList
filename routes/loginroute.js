const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')

router.get('/', (req, res) => {
  res.redirect('login')
});
router.get('/login', (req, res) => {
  res.render('./login/login')
});
router.get('/register', (req, res) => {
  res.render('./login/register')
});

router.post('/login', catchAsync(async(req,res) => {
  res.send("LOGIN")
}))

router.post('/register', catchAsync(async(req,res) => {
  res.send("REGISTER")
}))


module.exports = router;