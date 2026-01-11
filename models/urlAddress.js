const mongoose =  require('mongoose')

const urlSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('urlAddress', urlSchema)

