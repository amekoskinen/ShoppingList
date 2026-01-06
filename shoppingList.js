const mongoose = require('mongoose')

async function connect(){
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
}
connect()
    .then(
        console.log("Connected to database")
    ).catch(err => console.log(err));

const shoppingListSchema = mongoose.Schema({
    name: String,
    price: String
})

const shoppingList = mongoose.model('shoppingList', shoppingListSchema)





const shoppingItems= [
{name: "VELTIE 8RL WC-PAPERI SOFTWHITE 3KRS"},
{name: "WAU! Pyykinpesuneste 1,5 L Sensitive"},
{name: "Coop All-In-1 konetiskitabletti 30 kpl"},
{name: "Gourmet 85 g Perle Gravy Delight kanaa ja grillatun kanan makuista kastiketta kissanruoka"},
{name: "Gourmet 85g Gold Tonnikala Mousse kissanruoka"},
{name: "Best Friend Cattia Paakkuuntuva valkoinen kissanhiekka 5l"},
{name: "Dogman Crunchies dental kissanherkut 75g"},
{name: "Kotimaista kurkku"},
{name: "Coop miniluumutomaatti 250g"},
{name: "Kotimaista jääsalaatti 100g Suomi"},
{name: "H&H Tuominen sipuli"},
{name: "Pesty yleisperuna"},
{name: "Kotimaista 300g juureskuutiot"},
{name: "Oululainen Pullava Dallaspitko 400g"},
{name: "Fazer Jaffa Jim leivoskeksi 300g"},
{name: "Vaasan Kauratyynyt 360 g 6 kpl halkaistu kaurasekaleipä"},
{name: "Valio Oltermanni® e300 g viipale"},
{name: "Korpela Huittisten palvi 380g"},
{name: "Atria Kevyt Nauta-Possu Jauheliha 9,5% 400g"},
{name: "Coop Kevyt margariini 40 400 g"},
{name: "Kotimaista Ruokakerma 15% UHT laktoositon 2 dl"},
{name: "Kotimaista laktoositon pippurikerma 15 % 2 dl UHT"},
{name: "Coop Gnocchi kuviopasta 500 g"},
{name: "Kotimaista isot vapaan kanan munat L15"},
{name: "Kotimaista isot vapaan kanan munat L6"},
{name: "Kotimaista laktoositon 1 L rasvaton maitojuoma"},
{name: "Coop Lager olut 4,2 til-% tölkki 0,33 L"},
{name: "24-pack Coop Lager olut 4,2 % tölkki 0,33 L"},
{name: "Kulta Katriina Perinteinen suodatinkahvi RAC 500g"},
{name: "Xtra vadelmahillo 800 g"},
{name: "Oxygenol 75ml Herkkä hammastahna"},
{name: "Kotimaista laktoositon kermajäätelö kotipakkaus vanilja 1L/495g"},
]

async function makeShoppingList() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shoppingList')
    await shoppingList.insertMany(shoppingItems, price=0)
    console.log("finished")
}

// makeShoppingList()