const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const additionalSchema = mongoose.Schema({
    name: String,
    price: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Additional', additionalSchema)