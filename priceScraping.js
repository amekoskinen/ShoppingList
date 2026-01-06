const axios = require('axios')
const cheerio = require('cheerio')

const mongoose = require('mongoose')
const urlAddress = require('./urlAddresses')

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
        const $ = cheerio.load(html)
       
        $('.joHiJE').each((_i, el) => {
           
            let index1 = 0
            let index2 = $(el).text().indexOf(" €")
            // console.log("toinen ",index2)
            for (let i=index2-1; i>=0; i--){
                if(!isNumber($(el).text()[i])&& ($(el).text()[i]) !==","){
                    index1 = i+1
                    let price = $(el).text().substring(index1,index2)
                    prices.push(price)
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
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    const allPrices = []
    const allAddresses = await getAllURL()
    for (addr of allAddresses){
        const prices = await getPrices(addr)
        allPrices.push(...prices)
    }
    return allPrices
}

// scrapeAll().then(result => {
//     console.log("DONE:", result.length, "prices")
// }).catch(console.error)

module.exports = scrapeAllPrices





        // cwmmFn hinnat


        // 594