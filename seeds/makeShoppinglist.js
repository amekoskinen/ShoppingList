const mongoose = require('mongoose')
const ShoppingList = require('../models/ShoppingList')

const shoppingItems= [
{name: "VELTIE 8RL WC-PAPERI SOFTWHITE 3KRS",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "WAU! Pyykinpesuneste 1,5 L Sensitive",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Coop All-In-1 konetiskitabletti 30 kpl",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Gourmet 85 g Perle Gravy Delight kanaa ja grillatun kanan makuista kastiketta kissanruoka",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Gourmet 85g Gold Tonnikala Mousse kissanruoka",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Best Friend Cattia Paakkuuntuva valkoinen kissanhiekka 5l",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Dogman Crunchies dental kissanherkut 75g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista kurkku",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Coop miniluumutomaatti 250g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista jääsalaatti 100g Suomi",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "H&H Tuominen sipuli",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Pesty yleisperuna",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Coop 300g juureskuutiot",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Oululainen Pullava Dallaspitko 400g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Fazer Jaffa Jim leivoskeksi 300g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Vaasan Kauratyynyt 360 g 6 kpl halkaistu kaurasekaleipä",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Valio Oltermanni® e300 g viipale",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Korpela Huittisten palvi 380g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Atria Kevyt Nauta-Possu Jauheliha 9,5% 400g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Coop Kevyt margariini 40 400 g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista Ruokakerma 15% UHT laktoositon 2 dl",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista laktoositon pippurikerma 15 % 2 dl UHT",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Coop Gnocchi kuviopasta 500 g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista isot vapaan kanan munat L15",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista isot vapaan kanan munat L6",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista laktoositon 1 L rasvaton maitojuoma",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Coop Lager olut 4,2 til-% tölkki 0,33 L",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "24-pack Coop Lager olut 4,2 % tölkki 0,33 L",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kulta Katriina Perinteinen suodatinkahvi RAC 500g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Xtra vadelmahillo 800 g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Oxygenol 75ml Herkkä hammastahna",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
{name: "Kotimaista laktoositon kermajäätelö kotipakkaus vanilja 1L/495g",price: "0", quantity: 0, oldPrice: 0, user: "6968f0f7bcb573f0feb87664"},
]

async function makeShoppingList() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    await ShoppingList.deleteMany({})
    await ShoppingList.insertMany(shoppingItems)
    console.log("finished")
}

makeShoppingList()




