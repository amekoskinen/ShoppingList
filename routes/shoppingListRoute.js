const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const methodOverride = require('method-override');

const shoppingList = require('../controllers/shoppingList')
const addItems = require('../controllers/additems')

const {isLoggedIn} =  require('../utils/middleware');

router.use(methodOverride('_method'));

router.get('/', isLoggedIn, (req, res) => {
  res.render('index')
});

router.get('/showlist', isLoggedIn, catchAsync(shoppingList.showShoppingList));

router.get('/additems', isLoggedIn, addItems.renderAddItemsForm)

router.get('/print', isLoggedIn, catchAsync(shoppingList.renderPrintPage))

router.post('/getcategory', isLoggedIn, addItems.findItemsBasedOnUrl);


router.post('/getitems', isLoggedIn, addItems.findItemsBasedOnName)


router.post('/additems', isLoggedIn, catchAsync(addItems.addNewItems))


router.post('/showlist/update', isLoggedIn, catchAsync(shoppingList.updatePricesAndQuantities))

router.post('/additional', isLoggedIn, catchAsync(shoppingList.addAdditionalItems))

router.post('/notes/update', isLoggedIn, catchAsync(shoppingList.updateNotes))

router.post('/budget/update', isLoggedIn, catchAsync(shoppingList.updateBudget))

router.post('/deleteItem', isLoggedIn, catchAsync(shoppingList.deleteItem))

router.delete('/additional/delete/:id', isLoggedIn, catchAsync(shoppingList.deleteAdditionalItem))


module.exports = router;