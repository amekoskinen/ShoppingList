const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    url: {
        type: Schema.Types.ObjectId,
        ref: 'urlAddress'
    }
})
module.exports = mongoose.model('Item', itemSchema)