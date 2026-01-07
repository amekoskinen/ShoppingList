const axios = require('axios')
const cheerio = require('cheerio')

const mongoose = require('mongoose')
const urlAddress = require('../seeds/urlAddresses');

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

async function getProducts(url){
await connectDB()
const products = []
try {
    const response = await axios(url)
    const html = response.data;
    // console.log(html)
    const $ = cheerio.load(html)
        $('.joHiJE').each((_i, el) => {
            // console.log($(el).text(),"\n")
            let index1 = 0
            let index2 = $(el).text().indexOf(" €")
            for (let i=index2-1; i>=0; i--){
                if(!isNumber($(el).text()[i])&& ($(el).text()[i]) !==","){
                    index1 = i+1
                    let product = $(el).text().substring(0,index1)
                    products.push(product)
                    break
                }
            }
        })
        console.log(products)
        return products;
   
        } catch(err) {
            console.error(err);
            return []
        }
    }

async function scrapeAllProducts(){
    await connectDB()
    const allProducts = []
    const allAddresses = await getAllURL()
    for (addr of allAddresses){
        const products = await getProducts(addr)
        allProducts.push(...products)
    }
    return allProducts
}

// scrapeAllProducts().then(result => {
//     console.log("DONE:", result.length, "products")
// }).catch(console.error)



module.exports = scrapeAllProducts