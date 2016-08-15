var express = require('express');
var router = express.Router();
var markdown = require( "markdown" ).markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/articles/list/1/2');
});

module.exports = router;
