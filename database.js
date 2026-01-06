const mongoose = require('mongoose')
const getProducts = require('./productScraping')
const getPrices = require('./priceScraping')


async function connect(){
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
}
connect()
    .then(
        console.log("Connected to database")
    ).catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
    name: String,
    price: String
})
const Item = mongoose.model('Item', itemSchema)

async function addItems(){
    const products = await getProducts()
    const prices = await getPrices()
    if (products.length === prices.length){
        for (let i=0; i<products.length; i++){
            let newItem = new Item({name: products[i], price: prices[i]})
            await newItem.save()
        }
    }
    console.log("finished")
}

Item.deleteMany({})
addItems()







