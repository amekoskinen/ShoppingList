const axios = require('axios')
const cheerio = require('cheerio')

const mongoose = require('mongoose')
const urlAddress = require('../models/urlAddress')
const {attribute} = require('../utils/checkAttribute')


async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

async function getAllURL() {
    const allAddresses = []
    const result = await urlAddress.find()
    for (let i=0; i<result.length; i++){
        allAddresses.push(result[i].name)
    }
    return allAddresses;
}

function isNumber(value) {
    let numbers = ["0","1","2","3","4","5","6","7","8","9"]
    if (value in numbers){
        return true;
    }
}
async function getPrices(url) {
    const prices = []
    try{
        const response = await axios(url)
            const html = response.data;
            const attr = await attribute(url)
            const $ = cheerio.load(html)
            $(`.${attr}`).each((_i, el) => {
            let text = $(el).text()
            if (url=="https://www.s-kaupat.fi/tuotteet/maito-munat-ja-rasvat-0/munat"){
                text = text.replace("M10", "M10 ")
                text = text.replace("L15", "L15 ")
                text = text.replace("L10", "L10 ")
                text = text.replace("M15", "M15 ")
                text = text.replace("M15", "M15 ")
                text = text.replace("L6", "L6 ")
                text = text.replace("M6", "M6 ")
                text = text.replace("L4", "L4 ")
                text = text.replace("L8", "L8 ")
                text = text.replace("M 10", "M 10 ")
                text = text.replace("L 10", "L 10 ")
                text = text.replace("L 15", "L 15 ")
                text = text.replace("M 6", "M 6 ")
                text = text.replace("  "," ")
            }
            let index1 = 0
            let index2 = text.indexOf(" €")
            for (let i=index2-1; i>=0; i--){
                if(!isNumber(text[i])&& (text[i]) !==","){
                    index1 = i+1
                    let price = text.substring(index1,index2)
                    price = price.replace(",",".")
                    prices.push(parseFloat(price))
                    break
                }
            }
        })
        return prices;
        
        } catch(err){
            console.error(err);
            return [];
        }
}

async function scrapeAllPrices(){
    await connectDB()
    const allPrices = []
    const allAddresses = await getAllURL()
    for (addr of allAddresses){
        const prices = await getPrices(addr)
        allPrices.push(...prices)
    }
    return allPrices
}

module.exports = scrapeAllPrices