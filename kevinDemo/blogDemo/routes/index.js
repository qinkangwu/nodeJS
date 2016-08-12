var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Model('Article').find({}).populate('user').exec(function(err,articles){
      if(err){
        return next();
      }
      res.render('index',{
        'title':'首页',
        'articles' : articles
      });
  })
});

module.exports = router;
