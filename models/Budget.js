const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const budgetSchema = mongoose.Schema({
    money : Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Budget', budgetSchema)