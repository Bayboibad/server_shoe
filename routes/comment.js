var express = require('express');
var router = express.Router();
var commentApi = require('../api/comment.api');
router.get('/', (req, res, next) => {
    res.render('/');
  
});
router.get('/listCmtApi', commentApi.listAllApi);
router.post('/addCmtApi',commentApi.addCommentApi);
module.exports = router;
