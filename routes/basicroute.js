const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const mongoose = require('mongoose')
const methodOverride = require('method-override');

const Shoppinglist = require('../models/ShoppingList')
const Additional = require('../models/Additional')
const Item = require('../models/Item')
const URLaddresses = require('../models/urlAddress')
const Notes = require('../models/Notes')
const Budget = require('../models/Budget')

const findAllItems = require('../utils/findprice')
const findProducts = require('../webscraping/findProducts')
const findPrices = require('../webscraping/findPrices')
const addItems = require('../utils/addNewItems');

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
function isCorrectUrl(str){
  if (str.substring(0,33) == "https://www.s-kaupat.fi/tuotteet/"){
    return true;
  }
  return false;
}

router.use(methodOverride('_method'));

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/showlist', catchAsync(async(req,res) => {
    await connectDB()
    const products = await Shoppinglist.find({})
    const additionalItems = await Additional.find({})
    const notes = await Notes.findOne({})
    const budget = await Budget.findOne({})
    let allItems = 0
    let totalPrice = 0
    let overallPrice = 0
    for (let product of products){
      allItems = allItems+product.quantity
      totalPrice = totalPrice+(product.price*product.quantity)
    }
    totalPrice = totalPrice.toFixed(2)
    overallPrice = Number(totalPrice)
    for (let add of additionalItems){
      overallPrice = overallPrice+add.price
    }
    overallPrice = Number(overallPrice).toFixed(2)
    let moneyLeft = (budget.money-overallPrice).toFixed(2)
    res.render('showlist', {products, allItems, totalPrice, additionalItems, overallPrice, notes, budget, moneyLeft})
}));

router.get('/additems', (req,res) => {
  res.render('addItems',{products: [], prices:[], address: "", err: ""})
})
router.get('/print', catchAsync(async(req,res) => {
  await connectDB()
    const products = await Shoppinglist.find({})
    const additionalItems = await Additional.find({})
    const notes = await Notes.findOne({})
    const budget = await Budget.findOne({})
    let allItems = 0
    let totalPrice = 0
    let overallPrice = 0
    for (let product of products){
      allItems = allItems+product.quantity
      totalPrice = totalPrice+(product.price*product.quantity)
    }
    totalPrice = totalPrice.toFixed(2)
    overallPrice = Number(totalPrice)
    for (let add of additionalItems){
      overallPrice = overallPrice+add.price
    }
    overallPrice = Number(overallPrice).toFixed(2)
    let moneyLeft = (budget.money-overallPrice).toFixed(2)
  res.render('print', {products, allItems, totalPrice, additionalItems, overallPrice, notes, budget, moneyLeft})
}))

router.get('/printpage', (req,res) => {
  window.print()
  res.redirect('/shoppinglist/showlist');
})


router.post('/getitems', async(req,res) => {
    let alreadyDB = false;
    await connectDB()
    const address = await req.body.address;
    const urlAddresses = await URLaddresses.find({})
    if (!isValidUrl(address) || !isCorrectUrl(address)) {
    return res.render('additems', {
      products: [],
      prices: [],
      address: "",
      err: "Invalid URL. Please enter a full URL starting with https://www.s-kaupat.fi/tuotteet"
    });
    }

    try{
      const products = await findProducts(address)
      const prices = await findPrices(address)
      const pricesStr = []
      for (let price of prices){
      pricesStr.push(String(price))
      }
      for (let addr of urlAddresses){
        if (addr.name == address){
          alreadyDB = true;
          console.log("Already in database.")
        }
      }
      if (!alreadyDB){
          let newAddress = new URLaddresses({name: address})
          console.log(newAddress)
          await newAddress.save()
          for (let i=0; i<products.length; i++){
              let newItem = new Item({name: products[i], price: prices[i], tempPrice: prices[i]})
              await newItem.save()
              console.log("SAVING")
          }
        }
      
  
      res.render('additems', {products, prices, address, err: ""})
    }
  catch(err){
    let errorText = err;
    console.log("CHECK THIS!", errorText)
    res.render('additems', {products: [], prices: [], address: "", err : "ERROR!"})
    
  }
})

router.post('/additems', catchAsync(async(req,res) => {
  const newItems = Object.keys(req.body)
  console.log("This:" ,newItems)
  if (newItems.length == 0){
    res.redirect('/shoppinglist/additems')
  }
  for (let item of newItems){
    let newPrice = await Item.findOne({name: item})
    let price = newPrice.price;
    let newItem = new Shoppinglist({name: item, price: price, oldPrice: price, quantity: 0})
    await newItem.save()
  }
  res.redirect('/shoppinglist/showlist')
}))


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

router.post('/notes/update', catchAsync(async(req,res) => {
  await Notes.deleteMany({})
  let newNotes = await req.body;
  console.log(newNotes.notes.trim())
  const notes = await new Notes({name: newNotes.notes.trim()})
  await notes.save()
  res.redirect('/shoppinglist/showlist')
}))

router.post('/budget/update', catchAsync(async(req,res) => {
  await Budget.deleteMany({})
  let newBudget = await req.body;
  const budget = await new Budget({money: newBudget.budget.trim()})
  await budget.save()
  res.redirect('/shoppinglist/showlist')
}))


router.delete('/additional/delete/:id', catchAsync(async(req,res) => {
  const id = req.params.id;
  await Additional.findByIdAndDelete(id);
  res.redirect('/shoppinglist/showlist')
}))


module.exports = router;