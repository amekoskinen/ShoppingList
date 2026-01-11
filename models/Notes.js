const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    name: String,
})

module.exports = mongoose.model('Notes', notesSchema)