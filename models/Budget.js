const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    money : Number
})

module.exports = mongoose.model('Budget', budgetSchema)