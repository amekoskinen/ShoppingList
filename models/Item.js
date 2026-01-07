const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name: String,
    price: String,
    tempPrice: String
})
module.exports = mongoose.model('Item', itemSchema)