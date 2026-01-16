const Shoppinglist = require('../models/ShoppingList')
const Additional = require('../models/Additional')
const Notes = require('../models/Notes')
const Budget = require('../models/Budget')

const mongoose = require('mongoose')

const updateAllItems = require('../utils/updateShoppingListPrices')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
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

module.exports.updatePricesAndQuantities = async(req,res) => {
  const data = await req.body;
  const ids = Object.keys(data)
  await updateAllItems()
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