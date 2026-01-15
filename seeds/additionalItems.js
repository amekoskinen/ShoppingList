const mongoose = require('mongoose')
const Additional = require('../models/Additional')
const Budget = require('../models/Budget')

const additionalItems= [
    {name: "Tupakka",
     price: 216.00,
     user: '6968f0f7bcb573f0feb87664'   
    }
]
const budget = [
    {money: 200,
     user: '6968f0f7bcb573f0feb87664'   
    }

]


async function addAdditionalItems() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    await Additional.deleteMany({})
    await Additional.insertMany(additionalItems)
    console.log("finished")
}

async function addBudget() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    await Budget.deleteMany({})
    await Budget.insertMany(additionalItems)
    console.log("finished")
}



// addAdditionalItems()

addBudget()



