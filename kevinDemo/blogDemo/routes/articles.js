var express = require('express');
var router = express.Router();
var auth = require('../auth');

//添加文章
router.get('/add',function(req,res,next){
    if(!req.session.user){
        req.flash('error','请登录后操作');
        res.redirect('/users/login');
    }
    next();
},function(req, res, next) {
    res.render('article/add',{
        title : '发表文章'
    })
});

router.post('/add',function(req,res,next){
    if(!req.session.user){
        req.flash('error','请登录后操作');
        res.redirect('/users/login');
    }
    next();
},function(req, res, next) {
    var article = req.body;
    var user = req.session.user;
    article.user = user._id;
    new Model('Article')(article).save(function(err,doc){
        if(err){
            req.flash('error','文章发表失败');
            res.redirect('back');
        }

        req.flash('success','文章发表成功');
        res.redirect('/');
    });
});


module.exports = router;