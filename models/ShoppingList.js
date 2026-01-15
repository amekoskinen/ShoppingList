const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const shoppingListSchema = mongoose.Schema({
    name: String,
    price: Number,
    oldPrice: Number,
    quantity: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema)

