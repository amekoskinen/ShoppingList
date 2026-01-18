const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const updateAllItems = require('./utils/database')

const sessionOptions = { secret: 'NOTCONFIGURED', resave: false, saveUninitialized: false, 
        cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
       }
}

const ExpressError = require('./utils/ExpressError');
const shoppingListRoute = require('./routes/shoppingListRoute')
const loginRoute = require('./routes/loginRoute')
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

async function initDatabase() {
  await updateAllItems()
  await resetShoppingList()
  console.log("INITIALIZED!")  
}

// initDatabase() ACTIVATE LATER!

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('strict routing', false);

app.use(express.static('assets'))
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/shoppinglist', shoppingListRoute);
app.use('/', loginRoute);

app.all('/{*any}', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});