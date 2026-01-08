const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/showlist', (req,res) => {
    res.render('showlist')
})


module.exports = router;