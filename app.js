const express = require('express');
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync')
const basicroute = require('./routes/basicroute')
const ShoppingList = require('./models/ShoppingList')

mongoose.connect('mongodb://127.0.0.1:27017/shoppingList');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
async function resetShoppingList(){
  const list = await ShoppingList.find()
  for (let item of list){
    item.oldPrice = 0
  }
}

resetShoppingList()



const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('strict routing', false);


app.use(express.static('assets'))

app.use('/shoppinglist', basicroute);




app.get('/', (req, res) => {
  res.redirect('/shoppinglist')
});

app.all('/{*any}', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});


app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});