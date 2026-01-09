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
    let allItems = 0
    let totalPrice = 0
    for (let product of products){
      allItems = allItems+product.quantity
      totalPrice = totalPrice+(product.price*product.quantity)
    }
    res.render('showlist', {products, allItems, totalPrice})
}));

router.post('/showlist/update', catchAsync(async(req,res) => {
  const data = await req.body;
  const ids = Object.keys(data)
  for (let id of ids) {
    await Shoppinglist.findOneAndUpdate({ _id: id },
  { $set: { quantity: data[id] } },
  { new: true }
  )
}
  res.redirect('/shoppinglist/showlist')
}))


module.exports = router;