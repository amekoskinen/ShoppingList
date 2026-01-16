const mongoose = require('mongoose')
const ShoppingList = require('../models/ShoppingList')
const Item = require('../models/Item')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

async function updateAllItems() {
    await connectDB();
    const allItems = await Item.find()
    const shoppingItems = await ShoppingList.find() 
    for (let item of shoppingItems){
        let product = await Item.findOne({name: item.name})
        try{
            let oldPrice = await ShoppingList.findOne({name: item.name})
            const update = await ShoppingList.findOneAndUpdate({name: item.name}, {price: product.price, oldPrice: oldPrice.price})
            await update.save()
        }
        catch(err){
            console.log(item.name)
            console.error("There is a problem to update the price!")
        }
    }
    
    return allItems;
}

// findAllItems()

module.exports = updateAllItems