const mongoose = require('mongoose')
const urlAddress = require('../models/urlAddress')


async function seedURLaddresses(){
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    await urlAddress.deleteMany({})
    await urlAddress.insertMany([
    {name: "https://www.s-kaupat.fi/tuotteet/kodinhoito-ja-taloustarvikkeet/wc-paperit-talouspaperit-ja-nenaliinat/wc-paperit"},
    {name: "https://www.s-kaupat.fi/tuotteet/kodinhoito-ja-taloustarvikkeet/pyykinpesu/pyykinpesuaineet?page=2"},
    {name: "https://www.s-kaupat.fi/tuotteet/kodinhoito-ja-taloustarvikkeet/pyykinpesu/pyykinpesuaineet?page=3"},
    {name: "https://www.s-kaupat.fi/tuotteet/kodinhoito-ja-taloustarvikkeet/astianpesu/konetiskiaineet"},
    {name: "https://www.s-kaupat.fi/tuotteet/lemmikit-1/kissanruoka/kissan-markaruoka"},
    {name: "https://www.s-kaupat.fi/tuotteet/lemmikit-1/kissanhiekka-ja-kissan-tarvikkeet/kissanhiekka"},
    {name: "https://www.s-kaupat.fi/tuotteet/lemmikit-1/kissanruoka/kissan-herkut?page=2"},
    {name: "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset/kurkut"},
    {name: "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset/tomaatit"},
    {name: "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset/salaatit"},
    {name: "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/vihannekset/sipulit"},
    {name: "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/juurekset/perunat"},
    {name: "https://www.s-kaupat.fi/tuotteet/hedelmat-ja-vihannekset-1/helpot-ja-nopeat-kasvisratkaisut/ruoanlaittokasvikset"},
    {name: "https://www.s-kaupat.fi/tuotteet/leivat-keksit-ja-leivonnaiset-1/leivonnaiset/pitkot-ja-taytepitkot"},
    {name: "https://www.s-kaupat.fi/tuotteet/leivat-keksit-ja-leivonnaiset-1/keksit-ja-valipalapatukat/leivoskeksit"},
    {name: "https://www.s-kaupat.fi/tuotteet/leivat-keksit-ja-leivonnaiset-1/leivat/muut-vaaleat-leivat"},
    {name: "https://www.s-kaupat.fi/tuotteet/juustot-tofut-ja-kasvipohjaiset/pala-ja-viipalejuustot/kermajuustot"},
    {name: "https://www.s-kaupat.fi/tuotteet/liha-ja-kasviproteiinit-1/kinkut-ja-leikkeleet/kokolihaleikkeet?page=4"},
    {name: "https://www.s-kaupat.fi/tuotteet/liha-ja-kasviproteiinit-1/jauheliha/muut-jauhelihat"},
    {name: "https://www.s-kaupat.fi/tuotteet/maito-munat-ja-rasvat/rasvat/margariinit"},
    {name: "https://www.s-kaupat.fi/tuotteet/maito-munat-ja-rasvat/rasvat/margariinit?page=2"},
    {name: "https://www.s-kaupat.fi/tuotteet/maito-munat-ja-rasvat/kermat/ruokakermat"},
    {name: "https://www.s-kaupat.fi/tuotteet/pastat-riisit-ja-nuudelit/pastat/fusillit-pennet-ja-muut-kuviopastat"},
    {name: "https://www.s-kaupat.fi/tuotteet/maito-munat-ja-rasvat/munat"},
    {name: "https://www.s-kaupat.fi/tuotteet/maito-munat-ja-rasvat/maidot-ja-piimat/laktoosittomat-ja-vahalaktoosiset-maidot"},
    {name: "https://www.s-kaupat.fi/tuotteet/alkoholi-ja-virvoitusjuomat/oluet/vaalea-lager-olut"},
    {name: "https://www.s-kaupat.fi/tuotteet/kahvit-teet-ja-mehut/kahvit-ja-suodatinpaperit/vaaleapaahtoiset-suodatinjauhatuskahvit"},
    {name: "https://www.s-kaupat.fi/tuotteet/hillot-ja-sailykkeet/hillot/vadelmahillot"},
    {name: "https://www.s-kaupat.fi/tuotteet/kosmetiikka-ja-hygienia/suunhoito/hammastahnat"},
    {name: "https://www.s-kaupat.fi/tuotteet/kosmetiikka-ja-hygienia/suunhoito/hammastahnat?page=2"},
    {name: "https://www.s-kaupat.fi/tuotteet/pakasteet-1/jaatelot/jaatelopakkaukset?page=2"},
])
}

//seedURLaddresses()





