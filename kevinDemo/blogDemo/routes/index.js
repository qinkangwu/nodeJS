var express = require('express');
var router = express.Router();
var markdown = require( "markdown" ).markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
  Model('Article').find({}).populate('user').exec(function(err,articles){
      if(err){
        return next();
      }
      articles.forEach(function(article){
          article.content = markdown.toHTML(article.content);
      });
      res.render('index',{
        'title':'首页',
        'articles' : articles
      });
  })
});

module.exports = router;
