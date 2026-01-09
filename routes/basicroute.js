const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const mongoose = require('mongoose')
const Shoppinglist = require('../models/ShoppingList')


async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}


router.get('/', (req, res) => {
  res.render('index')
});

router.get('/showlist', catchAsync(async(req,res) => {
    const products = await Shoppinglist.find({})
    res.render('showlist', {products})
}));


module.exports = router;