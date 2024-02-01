var express = require('express');
var router = express.Router();
var categoryprApi = require('../api/category.api');
router.get('/', (req, res, next) => {
    res.render('/');
  
});
router.get('/listCategoryApi', categoryprApi.listCategoryApi);

module.exports = router;
