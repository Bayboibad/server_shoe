var express = require('express');
var router = express.Router();
var userAPi = require('../api/user.api');

/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/listUsersApi',userAPi.listUserApi);
router.post('/addUsersApi',userAPi.addUserApi);
module.exports = router;
