var express = require('express');
var router = express.Router();
const authorController = require('../controller/author.controller');
const categoryController = require('../controller/category.controller');
const productController = require('../controller/manage.controller');
const myProduct = require('../model/product');
const myCategory = require('../model/category');
const myAuthor = require('../model/author');
const myUser = require('../model/user');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var products = await myProduct.find();
  var categorys = await myCategory.find();
  var authors = await myAuthor.find();
  var users = await myUser.find();

  res.render('index', { title: 'Express', products: products, categorys: categorys, authors: authors, users: users });
});

router.post('/addProduct', productController.addProduct);

router.post('/addBrand', authorController.addAuthor);

router.post('/addCategory', categoryController.addCategory);
module.exports = router;
