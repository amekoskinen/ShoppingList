const mongoose = require('mongoose')
const ShoppingList = require('./models/ShoppingList')
const Item = require('./models/Item')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

async function findShoppingItems() {
    await connectDB();
    const shoppingItems = await ShoppingList.find()
    console.log(shoppingItems)
    return shoppingItems;
}

async function findAllItems() {
    await connectDB();
    const allItems = await Item.find()
    const selectedItem = await Item.find({name: 'VELTIE 8RL WC-PAPERI SOFTWHITE 3KRS'})
    console.log(selectedItem)
    return allItems;
}

// findShoppingItems()


findAllItems().then(() => mongoose.connection.close())