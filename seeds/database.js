const mongoose = require('mongoose')
const getProducts = require('../webscraping/productScraping')
const getPrices = require('../webscraping/priceScraping')
const Item = require('../models/Item')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}


async function addItems(){
    await connectDB()
    await Item.deleteMany({})
    const products = await getProducts()
    const prices = await getPrices()
    if (products.length === prices.length){
        for (let i=0; i<products.length; i++){
            let newItem = new Item({name: products[i], price: prices[i], tempPrice: prices[i]})
            await newItem.save()
        }
    }
    console.log("finished")
    
}

addItems()







