var express = require('express');
var router = express.Router();

/* GET users listing. */

//注册
router.get('/register', function(req, res, next) {
  res.render('user/register',{
    title : '注册'
  })
});

router.post('/register', function(req, res, next) {
  res.redirect('/');
});


//登录
router.get('/login', function(req, res, next) {
  res.render('user/login',{
    title : '登录'
  })
});
router.post('/login', function(req, res, next) {
  res.redirect('/');
});

//退出登录
router.get('/loginOut', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
