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

var upload = multer({ storage: storage });

router.get('/list/:pageNum/:pageSize',function(req, res, next) {
    var query = {};
    var pageNum = parseInt(req.params.pageNum);
    var pageSize = parseInt(req.params.pageSize);
    if(req.query.keyword){
        req.session.keyword = req.query.keyword;
        query.title = new RegExp(req.query.keyword,'i');
    }
    Model('Article').count(query,function(err,result){
        Model('Article').find(query).skip((pageNum-1)*pageSize).limit(pageSize).sort({createDate:-1}).populate('user').exec(function(err,articles){
            if(err){
                return next();
            }
            articles.forEach(function(article){
                article.content = markdown.toHTML(article.content);
            });
            res.render('index',{
                'title':'首页',
                'articles' : articles,
                'keyword'  : req.query.keyword,
                'pageNum'  : pageNum,
                'pageSize' : pageSize,
                'totalPage': Math.ceil(result/pageSize)
            });
        })
    });
});


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
        var update = {
            title:article.title,content:article.content
        };
        if(article.img){
            update.img = article.img;
        }
        Model('Article').findByIdAndUpdate(_id,{$set:update},function(err,doc){
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
        delete article._id;
        new Model('Article')(article).save(function(err,doc){
            if(err){
                req.flash('error','文章发表失败');
                res.redirect('back');
            }else{
                req.flash('success','文章发表成功');
                res.redirect('/');
            }
        });
    }
});


router.get('/delete/:_id',function(req, res, next) {
    var _id = req.params['_id'];
    Model('Article').findByIdAndRemove(_id,function(err,result){
        if(err){
            req.flash('error','删除文章失败');
            return res.redirect('back');
        }else{
            res.redirect('/');
        }
    });
});


module.exports = router;