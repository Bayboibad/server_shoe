var express = require('express');
var router = express.Router();
var authprApi = require('../api/author.api');
router.get('/', (req, res, next) => {
    res.render('/');
  
});
router.get('/listAuthorApi', authprApi.listAuthorApi);

module.exports = router;
