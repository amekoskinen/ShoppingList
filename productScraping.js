const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset';

async function getProducts(){
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
            else{
                console.log($(el).text())
            }
            
        })
        return products;
   
        } catch(err) {
            console.error(err);
            return []
        }
    }

getProducts().then(prices => {
    console.log(prices)
})