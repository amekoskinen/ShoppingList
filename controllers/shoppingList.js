const Shoppinglist = require('../models/ShoppingList')
const Additional = require('../models/Additional')
const Item = require('../models/Item')
const URLaddresses = require('../models/urlAddress')
const Notes = require('../models/Notes')
const Budget = require('../models/Budget')

const mongoose = require('mongoose')

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



module.exports.showShoppingList = async(req,res) => {
    await connectDB()
    const products = await Shoppinglist.find({user: req.user._id})
    const additionalItems = await Additional.find({user: req.user._id})
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
}

module.exports.renderPrintPage = async(req,res) => {
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
}

module.exports.findItemsBasedOnUrl = async(req,res) => {
    let alreadyDB = false;
    await connectDB()
    const address = await req.body.address;
    const urlAddresses = await URLaddresses.find({})
    if (!isValidUrl(address) || !isCorrectUrl(address)) {
      req.flash('error','Invalid URL. Please enter a full URL starting with https://www.s-kaupat.fi/tuotteet')
      return res.redirect('/shoppinglist/additems')
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
      res.render('additems', {products, prices, address, productName: ""})
    } catch(err) {
    let errorText = err;
    console.log("THERE WAS ERROR!", errorText)
    res.render('additems', {products: [], prices: [], address: "", err : "ERROR!"})
    
  }
}

module.exports.findItemsBasedOnName = async(req,res) => {
    await connectDB()
    const productName = await req.body.productName;
    const products=[]
    const prices=[]
    try{
      const matches = await Item.find({"name": { "$regex" : productName, "$options": "i"}})
      console.log("THESE ARE", matches)
      if (matches.length===0){
        console.log("TESTI")
        req.flash('error',"Couldn't find any products, try sending url address, where you can find the product!")
        return res.redirect('/shoppinglist/additems')
      }
      for (let match of matches){
        products.push(match.name)
        prices.push(match.price)
      }

       res.render('additems', {products, prices, address:"", productName: productName})
      } catch(err) {
    let errorText = err;
    console.log("CHECK THIS!", errorText)
    res.render('additems', {products: [], prices: [], address: "", err : "ERROR!"})
    
  }
}

module.exports.addNewItems = async(req,res) => {
  const newItems = Object.keys(req.body)
  console.log("This:" ,newItems)
  if (newItems.length == 0){
    res.redirect('/shoppinglist/additems')
  }
  for (let item of newItems){
    let newPrice = await Item.findOne({name: item})
    let price = newPrice.price;
    let newItem = new Shoppinglist({name: item, price: price, oldPrice: price, quantity: 0, user: req.user._id})
    req.flash('success', 'New item added!');
    await newItem.save()
  }
  res.redirect('/shoppinglist/showlist')
}

module.exports.renderAddItemsForm = (req,res) => {
  res.render('addItems',{products: [], prices:[], address: "", err: "", productName: ""})
}

module.exports.updatePricesAndQuantities = async(req,res) => {
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
}

module.exports.addAdditionalItems = async(req,res) => {
  const item = await req.body;
  await Additional.insertOne({name: item.additionalItemName, price: item.additionalItemPrice, user: req.user._id})
  res.redirect('/shoppinglist/showlist')
}

module.exports.updateNotes = async(req,res) => {
  await Notes.deleteMany({})
  let newNotes = await req.body;
  console.log(newNotes.notes.trim())
  const notes = await new Notes({name: newNotes.notes.trim(), user: req.user._id})
  await notes.save()
  res.redirect('/shoppinglist/showlist')
}

module.exports.updateBudget = async(req,res) => {
  await Budget.deleteMany({})
  let newBudget = await req.body;
  const budget = await new Budget({money: newBudget.budget.trim(), user: req.user._id})
  await budget.save()
  res.redirect('/shoppinglist/showlist')
}

module.exports.deleteItem = async(req,res) => {
  console.log(req.body)
  const id = req.body.id
  await Shoppinglist.findByIdAndDelete(id);
  req.flash('success', 'Item deleted!')
  res.redirect('/shoppinglist/showlist')
}

module.exports.deleteAdditionalItem = async(req,res) => {
  const id = req.params.id;
  await Additional.findByIdAndDelete(id);
  req.flash('success', 'Additional item deleted!')
  res.redirect('/shoppinglist/showlist')
}