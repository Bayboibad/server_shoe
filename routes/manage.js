var express = require('express');
var router = express.Router();
const manageApiController = require('../api/manage.api');
const myModel= require('../model/product')
const myUser = require('../model/user');
const myAuthor = require('../model/author');

const authorController = require('../controller/author.controller');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const query = await myModel.find();
  const userModel = await myUser.find();
  res.render('manage',{product : query, user:userModel});
});

// API
router.get('/listProductApi',manageApiController.listAllProduct);
router.post('/addProductApi',manageApiController.addManageApi);
router.put('/updateProductApi',manageApiController.updateManageApi);
router.delete('/deleteProductApi',manageApiController.deleteManageApi);


module.exports = router;
