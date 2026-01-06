const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset';

function isNumber(value) {
    let numbers = ["0","1","2","3","4","5","6","7","8","9"]
    if (value in numbers){
        return true;
    }
}
async function getPrices() {
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
        
        } catch{
            console.error(err);
            return [];
        }
}

module.exports = getPrices





        // cwmmFn hinnat