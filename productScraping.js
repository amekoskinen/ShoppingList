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

async function getProducts(url){
const products = []
try {
    const response = await axios(url)
    const html = response.data;
    const $ = cheerio.load(html)
        $('.joHiJE').each((_i, el) => {
            let index = 0
            if ($(el).text().indexOf("n.") !== -1){
            index = $(el).text().indexOf("n.")
            let product = $(el).text().substring(0,index+1).trim()
            }
            else if ($(el).text().indexOf("Suomi") !==-1){
                index = $(el).text().indexOf("Suomi")
                let product = ($(el).text().substring(0,index+5).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("l3") !==-1){
                index = $(el).text().indexOf("l3")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("0g") !==-1){
                index = $(el).text().indexOf("0g")
                let product = ($(el).text().substring(0,index+2).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf(" g") !==-1){
                index = $(el).text().indexOf(" g")
                let product = ($(el).text().substring(0,index+2).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("1") !==-1){
                index = $(el).text().indexOf("1")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("l4") !==-1){
                index = $(el).text().indexOf("l4")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("n3") !==-1){
                index = $(el).text().indexOf("n3")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("n4") !==-1){
                index = $(el).text().indexOf("n4")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            
            else if ($(el).text().indexOf("l8") !==-1){
                index = $(el).text().indexOf("l8")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("S2") !==-1){
                index = $(el).text().indexOf("S2")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("l2") !==-1){
                index = $(el).text().indexOf("l2")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("n8") !==-1){
                index = $(el).text().indexOf("n8")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("l9") !==-1){
                index = $(el).text().indexOf("l9")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("a5") !==-1){
                index = $(el).text().indexOf("a5")
                
                let product = ($(el).text().substring(0,index+1).trim())
            }
            else if ($(el).text().indexOf("l7") !==-1){
                index = $(el).text().indexOf("l7")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("e9") !==-1){
                index = $(el).text().indexOf("e9")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("i9") !==-1){
                index = $(el).text().indexOf("i9")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("i4") !==-1){
                index = $(el).text().indexOf("i4")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("a0") !==-1){
                index = $(el).text().indexOf("a0")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("g3") !==-1){
                index = $(el).text().indexOf("g3")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else if ($(el).text().indexOf("g4") !==-1){
                index = $(el).text().indexOf("g4")
                let product = ($(el).text().substring(0,index+1).trim())
                products.push(product)
            }
            else{
                console.log("PROBLEM SCRAPING!")
                console.log($(el).text())
            }
            
        })
        // console.log(products)
        return products;
   
        } catch(err) {
            console.error(err);
            return []
        }
    }

async function scrapeAllProducts(){
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    const allProducts = []
    const allAddresses = await getAllURL()
    for (addr of allAddresses){
        const products = await getProducts(addr)
        allProducts.push(...products)
    }
    return allProducts
}

// scrapeAll().then(result => {
//     console.log("DONE:", result.length, "products")
// }).catch(console.error)



module.exports = scrapeAllProducts