var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var category = req.query.category;
  //categoryTree(category);
  //res.render('categorytree', { categorytree: data });
});

module.exports = router;
