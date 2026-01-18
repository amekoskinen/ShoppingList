const mongoose = require('mongoose')

const Item = require('../models/Item')
const URLaddresses = require('../models/urlAddress')
const Shoppinglist = require('../models/ShoppingList')

const findProducts = require('../webscraping/findProducts')
const findPrices = require('../webscraping/findPrices')
const addItems = require('../utils/addNewItems');

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
    return true;}
  return false;}

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

module.exports.renderAddItemsForm = (req,res) => {
  res.render('addItems',{products: [], prices:[], address: "", err: "", productName: ""})
}

module.exports.findItemsBasedOnUrl = async(req,res) => {
    const address = await req.body.address;
    if (!isValidUrl(address) || !isCorrectUrl(address)) {
      req.flash('error','Invalid URL. Please enter a full URL starting with https://www.s-kaupat.fi/tuotteet')
      return res.redirect('/shoppinglist/additems')
    }
    let alreadyDB = false;
    await connectDB()

    try{
      const urlAddresses = await URLaddresses.find({})
      const products = await findProducts(address)
      if (!products.length){
        req.flash('error','Could not find any products, please check the address!')
        return res.redirect('/shoppinglist/additems');
        }
      const prices = await findPrices(address)
      const pricesStr = []
      for (let price of prices){
      pricesStr.push(String(price))
      }
      for (let addr of urlAddresses){
        if (addr.name == address){
          alreadyDB = true;
          console.log("Already in database.")
          break;
        }
      }
      if (!alreadyDB){
          let newAddress = new URLaddresses({name: address})
          await newAddress.save()
          urlId = await urlAddresses.findOne({name: addr}).lean()
          for (let i=0; i<products.length; i++){
              let newItem = new Item({name: products[i], price: prices[i], url: urlId._id})
              await newItem.save()
              console.log("Saving new items to database.")
          }
        }
      res.render('additems', {products, prices, address, productName: ""})
    } catch(err) {
    req.flash('error',"Couldn't check products by url!")
        console.log("CHECK THIS!", err)
    res.render('additems', {products: [], prices: [], address: ""})
  }
}

module.exports.findItemsBasedOnName = async(req,res) => {
    await connectDB()
    const productName = await req.body.productName;
    if(!req.body.productName){
      req.flash('error', 'Please add a product name!')
      return res.redirect('/shoppinglist/additems')
    }
    const products=[]
    const prices=[]
    try{
      const matches = await Item.find({"name": { "$regex" : productName, "$options": "i"}})
      if (matches.length===0){
        req.flash('error',"Couldn't find any products, try sending url address, where you can find the product!")
        return res.redirect('/shoppinglist/additems')
      }
      for (let match of matches){
        products.push(match.name)
        prices.push(match.price)
      }

       res.render('additems', {products, prices, address:"", productName: productName})
      } catch(err) {
        req.flash('error',"Couldn't check products by name, try sending url address!")
        console.log("CHECK THIS!", err)
        res.render('additems', {products: [], prices: [], address: ""})
  }
}

module.exports.addNewItems = async(req,res) => {
  const newItems = Object.keys(req.body)
  if (newItems.length == 0){
    res.redirect('/shoppinglist/additems')
  }
  for (let item of newItems){
    let newPrice = await Item.findOne({name: item})
    let price = newPrice.price;
    let newItem = new Shoppinglist({name: item, price: price, oldPrice: price, quantity: 0, user: req.user._id})
    await newItem.save()
  }
  req.flash('success', 'New item(s) added!');
  res.redirect('/shoppinglist/showlist')
}
