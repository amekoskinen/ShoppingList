const mongoose = require('mongoose')

const shoppingListSchema = mongoose.Schema({
    name: String,
    price: String,
    quantity: Number
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema)

