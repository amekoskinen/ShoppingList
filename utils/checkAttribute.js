const Fetch = require('node-fetch')

const url = "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset/kurkut"

const attribute = async function check(url){
    const response = await fetch(url)
    const data = await response.text()
    const index = data.indexOf('" data-test-id="product-card"')
    const attribute = data.substring(index-6,index)
    return attribute;
}

module.exports = {attribute}
