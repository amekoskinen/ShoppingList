const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
})
module.exports = mongoose.model('Item', itemSchema)