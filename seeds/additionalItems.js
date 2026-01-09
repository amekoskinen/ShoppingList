const mongoose = require('mongoose')
const Additional = require('../models/Additional')

const additionalItems= [
    {name: "Tupakka",
     price: 216.00   
    }
]


async function addAdditionalItems() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    await Additional.deleteMany({})
    await Additional.insertMany(additionalItems)
    console.log("finished")
}

addAdditionalItems()




