const axios = require('axios')
const cheerio = require('cheerio')

const mongoose = require('mongoose')
const urlAddress = require('../seeds/urlAddresses');
const {attribute} = require('../utils/checkAttribute')

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');
    }
}

function isNumber(value) {
    let numbers = ["0","1","2","3","4","5","6","7","8","9"]
    if (value in numbers){
        return true;
    }
}

async function findProducts(url){
await connectDB()
const products = []
try {
    const response = await axios.get(url, {
    validateStatus: status => status < 500
    });

    const html = response.data;
    // console.log(html)
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
                    let product = text.substring(0,index1).trim()
                    product = product.replace("  "," ")
                    products.push(product)
                    break
                }
            }
        })
        let cleanProducts = []
        for (let prod of products){
            let cleanProduct = prod.replace("n.Noin","")
            // console.log(cleanProduct)
            cleanProducts.push(cleanProduct)
        }
        return cleanProducts;
   
        } catch(err) {
            console.error(err);
            return []
        }
    }


module.exports = findProducts