const mongoose = require('mongoose')
const ShoppingList = require('./models/ShoppingList')
const Item = require('./models/Item')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}


async function findAllItems() {
    await connectDB();
    const allItems = await Item.find()
    const shoppingItems = await ShoppingList.find() 
    for (let item of shoppingItems){
        let product = await Item.findOne({name: item.name})
        try{
            console.log(product.price)
            const update = await ShoppingList.findOneAndUpdate({name: item.name}, {price: product.price})
            await update.save()
        }
        catch(err){
            console.log(item.name)
            console.error("CHECK!")
        }
    }
    
    return allItems;
}

// findShoppingItems()


findAllItems().then(() => mongoose.connection.close())