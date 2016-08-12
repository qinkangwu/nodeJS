var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var markdown = require( "markdown" ).markdown;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })
//添加文章
router.get('/add',function(req,res,next){
    if(!req.session.user){
        req.flash('error','请登录后操作');
        res.redirect('/users/login');
    }
    next();
},function(req, res, next) {
    res.render('article/add',{
       'article' : {}
    })
});

router.get('/detail/:_id',function(req, res, next) {
    var _id = req.params['_id'];
    Model('Article').findById(_id,function(err,article){
        if(err || !article){
            req.flash('error','文章读取失败');
            return res.redirect('back');
        }else{
            article.content = markdown.toHTML(article.content);
            res.render('article/detail',{
                article : article
            })
        }
    });

});




router.get('/edit/:_id',function(req, res, next) {
    var _id = req.params['_id'];
    Model('Article').findById(_id,function(err,article){
        if(err || !article){
            req.flash('error','文章读取失败');
            return res.redirect('back');
        }else{
            res.render('article/add',{
                article : article
            })
        }
    });

});

router.post('/add',function(req,res,next){
    if(!req.session.user){
        req.flash('error','请登录后操作');
        res.redirect('/users/login');
    }
    next();
},upload.single('img'),function(req, res, next) {
    var article = req.body;
    var _id = req.body._id;
    if(req.file){
        article.img = path.join('/uploads/'+req.file.filename);
    }
    if(_id){
        Model('Article').findByIdAndUpdate(_id,{

        },function(err,doc){
            if(err || !article){
                req.flash('error','文章读取失败');
                return res.redirect('back');
            }else{
                res.redirect('/articles/detail/'+_id);
            }
        });
    }else{
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
    }
});


module.exports = router;