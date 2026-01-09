const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    tempPrice: Number
})
module.exports = mongoose.model('Item', itemSchema)