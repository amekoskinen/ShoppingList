const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const urlAddress = require('./urlAddresses')
// const url = 'https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset';

async function connect(){
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
}
connect()
    .then(
        console.log("Connected to database")
    ).catch(err => console.log(err));



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
            let product = $(el).text().substring(0,index)
            products.push(product)
            }
            else if ($(el).text().indexOf("Suomi") !==-1){
                index = $(el).text().indexOf("Suomi")
                products.push(($(el).text().substring(0,index+5)))
            }
            else if ($(el).text().indexOf("0g") !==-1){
                index = $(el).text().indexOf("0g")
                products.push(($(el).text().substring(0,index+2)))
            }
            else if ($(el).text().indexOf(" g") !==-1){
                index = $(el).text().indexOf(" g")
                products.push(($(el).text().substring(0,index+2)))
            }
            else if ($(el).text().indexOf("1") !==-1){
                index = $(el).text().indexOf("1")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("l4") !==-1){
                index = $(el).text().indexOf("l4")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("n3") !==-1){
                index = $(el).text().indexOf("n3")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("n4") !==-1){
                index = $(el).text().indexOf("n4")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("l3") !==-1){
                index = $(el).text().indexOf("l3")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("l8") !==-1){
                index = $(el).text().indexOf("l8")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("S2") !==-1){
                index = $(el).text().indexOf("S2")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("l2") !==-1){
                index = $(el).text().indexOf("l2")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("n8") !==-1){
                index = $(el).text().indexOf("n8")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("l9") !==-1){
                index = $(el).text().indexOf("l9")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("a5") !==-1){
                index = $(el).text().indexOf("a5")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("l7") !==-1){
                index = $(el).text().indexOf("l7")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("e9") !==-1){
                index = $(el).text().indexOf("e9")
                products.push(($(el).text().substring(0,index)))
            }
            else if ($(el).text().indexOf("i9") !==-1){
                index = $(el).text().indexOf("i9")
                products.push(($(el).text().substring(0,index)))
            }
             else if ($(el).text().indexOf("i4") !==-1){
                index = $(el).text().indexOf("i4")
                products.push(($(el).text().substring(0,index)))
            }
             else if ($(el).text().indexOf("a0") !==-1){
                index = $(el).text().indexOf("a0")
                products.push(($(el).text().substring(0,index)))
            }
             else if ($(el).text().indexOf("g3") !==-1){
                index = $(el).text().indexOf("g3")
                products.push(($(el).text().substring(0,index)))
            }
             else if ($(el).text().indexOf("g4") !==-1){
                index = $(el).text().indexOf("g4")
                products.push(($(el).text().substring(0,index)))
            }

            else{
                console.log("PROBLEM SCRAPING!")
                console.log($(el).text())
                return
            }
            
        })
        // console.log(products)
        return products;
   
        } catch(err) {
            console.error(err);
            return []
        }
    }

async function scrapeAll(){
    const allProducts = []
    const allAddresses = await getAllURL()
    for (addr of allAddresses){
        const products = await getProducts(addr)
        allProducts.push(...products)
    }
    return allProducts
}

scrapeAll().then(result => {
    console.log("DONE:", result.length, "products")
}).catch(console.error)



module.exports = getProducts