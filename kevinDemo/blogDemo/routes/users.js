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
  var user = req.body;
  console.log(user);
  if(user.password!=user.repassword){
      req.flash('success','密码不一致');
      res.redirect('back');
  }
  delete user.repassword;
  user.password = blogUtils.md5(user.password);
  user.avatar = 'https://secure.gravatar.com/avatar/'+blogUtils.md5(user.email)+'?s=48';
  console.log(user);
  new Model('User')(user).save(function(err,doc){
        if(err){
            req.flash('success','注册失败');
            return res.redirect('back');
        }else{
            req.session.user = doc;
            req.flash('success','注册成功');
            res.redirect('/');
        }

  });
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
    req.session.user = null;
    req.session.success = '';
  res.redirect('/');
});

module.exports = router;
