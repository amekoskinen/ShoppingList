const mongoose = require('mongoose')

const shoppingListSchema = mongoose.Schema({
    name: String,
    price: String,
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema)

