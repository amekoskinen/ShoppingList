const axios = require('axios')
const cheerio = require('cheerio')

const mongoose = require('mongoose')
const urlAddress = require('../seeds/urlAddresses');
const { connect } = require('puppeteer/lib/cjs/puppeteer/puppeteer.js');

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

async function getProducts(url){
const products = []
try {
    const response = await axios(url)
    const html = response.data;
    const $ = cheerio.load(html)
        $('.joHiJE').each((_i, el) => {
            let index = 0
            if ($(el).text().indexOf("g2") !== -1){
                index = $(el).text().indexOf("g2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l4") !== -1){
                index = $(el).text().indexOf("l4")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l8") !== -1){
                index = $(el).text().indexOf("l8")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l1") !== -1){
                index = $(el).text().indexOf("l1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("n3") !== -1){
                index = $(el).text().indexOf("n3")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("n1") !== -1){
                index = $(el).text().indexOf("n1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l3") !== -1){
                index = $(el).text().indexOf("l3")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("n4") !== -1){
                index = $(el).text().indexOf("n4")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l5") !== -1){
                index = $(el).text().indexOf("l5")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("n8") !== -1){
                index = $(el).text().indexOf("n8")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("S2") !== -1){
                index = $(el).text().indexOf("S2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l7") !== -1){
                index = $(el).text().indexOf("l7")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l2") !== -1){
                index = $(el).text().indexOf("l2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l9") !== -1){
                index = $(el).text().indexOf("l9")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a5") !== -1){
                index = $(el).text().indexOf("a5")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e5") !== -1){
                index = $(el).text().indexOf("e5")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e2") !== -1){
                index = $(el).text().indexOf("e2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a9") !== -1){
                index = $(el).text().indexOf("a9")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a7") !== -1){
                index = $(el).text().indexOf("a7")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a6") !== -1){
                index = $(el).text().indexOf("a6")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e7") !== -1){
                index = $(el).text().indexOf("e7")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e6") !== -1){
                index = $(el).text().indexOf("e6")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("g5") !== -1){
                index = $(el).text().indexOf("g5")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e3") !== -1){
                index = $(el).text().indexOf("e3")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("g3") !== -1){
                index = $(el).text().indexOf("n3")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e9") !== -1){
                index = $(el).text().indexOf("e9")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("i9") !== -1){
                index = $(el).text().indexOf("i9")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("i1") !== -1){
                index = $(el).text().indexOf("i1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("i5") !== -1){
                index = $(el).text().indexOf("i5")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("l6") !== -1){
                index = $(el).text().indexOf("l6")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a2") !== -1){
                index = $(el).text().indexOf("a2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("i4") !== -1){
                index = $(el).text().indexOf("i4")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("g4") !== -1){
                index = $(el).text().indexOf("g4")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a1") !== -1){
                index = $(el).text().indexOf("a1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("g7") !== -1){
                index = $(el).text().indexOf("g7")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("a0") !== -1){
                index = $(el).text().indexOf("a0")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("L1") !== -1){
                index = $(el).text().indexOf("L1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("k2") !== -1){
                index = $(el).text().indexOf("k2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("k1") !== -1){
                index = $(el).text().indexOf("k1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("u3") !== -1){
                index = $(el).text().indexOf("L1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e1") !== -1){
                index = $(el).text().indexOf("e1")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("e8") !== -1){
                index = $(el).text().indexOf("e8")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("%3") !== -1){
                index = $(el).text().indexOf("%3")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else if ($(el).text().indexOf("t2") !== -1){
                index = $(el).text().indexOf("t2")
                let product = $(el).text().substring(0,index+1).trim()
                products.push(product)
            }
            else{
                console.log("PROBLEM SCRAPING!")
                console.log($(el).text())
            }
            
        })
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