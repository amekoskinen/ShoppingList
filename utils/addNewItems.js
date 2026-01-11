const mongoose = require('mongoose')
const findPrices = require('../webscraping/findPrices')
const findProducts = require('../webscraping/findProducts')
const Item = require('../models/Item')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

async function addItems(url){
    await connectDB()
    const products = await findProducts(url)
    const prices = await findPrices(url)
    if (products.length === prices.length){
        for (let i=0; i<products.length; i++){
            let newItem = new Item({name: products[i], price: prices[i], tempPrice: prices[i]})
             await newItem.save()
        }
    }
    console.log(products)
}

module.exports = addItems