var formidable = require('formidable');
var db = require('../model/db.js');

//显示首页
exports.showIndex=function(req,res){
    res.render('index',{
        'login' : req.session.login==='1'?true:false,
        'username':req.session.login==='1'?req.session.username:''
    });
}

//显示注册页面
exports.showRegister=function(req,res){
    res.render('register',{
        'login' : req.session.login==='1'?true:false,
        'username':req.session.login==='1'?req.session.username:''
    });
}


//显示登录页面
exports.showLogin=function(req,res){
    res.render('login',{
        'login' : req.session.login==='1'?true:false,
        'username':req.session.login==='1'?req.session.username:''
    });
}

//处理注册信息
exports.doRegister=function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var username=fields.username;
        var password=fields.password;

        //检查数据库中是否已经存在此用户名
        db.find('user',{
            'username':username
        },function(err,result){

            //存在
            if(result.length!=0){
                res.send('-2');
                return;
            }else{
                //对密码进行加密操作
                db.md5(password,function (password) {
                    //不存在，做插入操作
                    db.insert('user',{
                        'username':username,
                        'password':password
                    },function(err,result){
                        if(err){
                            res.send('-3');
                            return;
                        }
                        req.session.login='1';
                        req.session.username=username;
                        res.send('1');
                    })
                })

            }
        })
    });

    return;
}


//处理登录业务
exports.doLogin=function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var username=fields.username;
        var password=fields.password;
        db.find('user',{'username':username},function(err,result){
            //服务器错误
            if(err){res.send('-3');return};
            //用户名存在
            if(result.length==0){
                res.send('-2');
                return;
            }
            //对密码加密后比较
            db.md5(password,function(password){
                //不等于
                if(result[0].password!=password){
                    res.send('-1');
                    return;
                }
                req.session.login='1';
                req.session.username=username;
                //等于
                res.send('1');
            })
        })
    });

    return;
}