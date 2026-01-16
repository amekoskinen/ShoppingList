const mongoose = require('mongoose')
const getProducts = require('../webscraping/productScraping')
const getPrices = require('../webscraping/priceScraping')
const Item = require('../models/Item')
const urlAddress = require('../models/urlAddress')
const { addListener } = require('../models/User')

async function getAllURL() {
    const allAddresses = []
    const result = await urlAddress.find()
    for (let i=0; i<result.length; i++){
        allAddresses.push(result[i].name)
    }
    return allAddresses;
}

async function updateAllItems(){
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
    await Item.deleteMany({})
    const allAddresses = await getAllURL()
    let prices = []
    let products = []
    for (addr of allAddresses){
        prices = await getPrices(addr)
        products = await getProducts(addr)
        urlId = await urlAddress.findOne({name: addr}).lean()
        for (let i=0; i<products.length; i++){
            let newItem = new Item({name: products[i], price: prices[i], url: urlId._id})
            await newItem.save()
        }
    }
    console.log("All items found")
}
// updateAllItems()

module.exports = updateAllItems







