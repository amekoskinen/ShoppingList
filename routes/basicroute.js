const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const mongoose = require('mongoose')
const methodOverride = require('method-override');

const Shoppinglist = require('../models/ShoppingList')
const Additional = require('../models/Additional')
const findAllItems = require('../utils/findprice')


async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/showlist', catchAsync(async(req,res) => {
    const products = await Shoppinglist.find({})
    const additionalItems = await Additional.find({})
    let allItems = 0
    let totalPrice = 0
    let overallPrice = 0
    for (let product of products){
      allItems = allItems+product.quantity
      totalPrice = totalPrice+(product.price*product.quantity)
    }
    overallPrice = totalPrice
    for (let add of additionalItems){
      overallPrice = overallPrice+add.price
    }
    res.render('showlist', {products, allItems, totalPrice, additionalItems, overallPrice})
}));

router.post('/showlist/update', catchAsync(async(req,res) => {
  const data = await req.body;
  const ids = Object.keys(data)
  await findAllItems()
  for (let id of ids) {
    await Shoppinglist.findOneAndUpdate({ _id: id },
  { $set: { quantity: data[id] } },
  { new: true }
  )
}
  res.redirect('/shoppinglist/showlist')
}))

router.post('/additional', catchAsync(async(req,res) => {
  const item = await req.body;
 await Additional.insertOne({name: item.additionalItemName, price: item.additionalItemPrice })
  res.redirect('/shoppinglist/showlist')
}))

router.delete('/additional/delete/:id', catchAsync(async(req,res) => {
  const id = req.params.id;
  await Additional.findByIdAndDelete(id);
  res.redirect('/shoppinglist/showlist')
}))


module.exports = router;