const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const passport = require('passport');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.redirect('login')
});
router.get('/login', (req, res) => {
  res.render('./login/login')
});
router.get('/register', (req, res) => {
  res.render('./login/register')
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Shopping List!');
            res.redirect('/shoppinglist');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/shoppinglist';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



module.exports = router;