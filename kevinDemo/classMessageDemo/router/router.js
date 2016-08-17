var formidable = require('formidable');
var db = require('../model/db.js');
var fs=require('fs');
var gm=require('gm');

//显示首页
exports.showIndex=function(req,res){
    if(req.session.login=='1'){
        var login=true;
        var username=req.session.username;
    }else{
        var login=false;
        var username='';
    }
        db.find('user',{
            'username':username
        },function(err,result){
            if(err){
                return;
            }
            if(result.length==0){
                var avatar='moren.jpg';
            }else{
                var avatar=result[0].avatar;
            }

            res.render('index',{
                'login' : login,
                'username':username,
                'avatar':avatar
            });
            return;
        })


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

//显示设置头像页
exports.showSetAvatar=function(req,res){
    if(req.session.login!='1'){
        res.redirect('/login')
        return;
    }
    res.render('setAvatar',{
        'login' : true,
        'username':req.session.username
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
                        'password':password,
                        'avatar':'moren.jpg'
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


//上传头像操作
exports.doSetAvatar=function(req,res){
    var form =new formidable.IncomingForm();
    form.uploadDir='./avatar/';
    form.parse(req,function(err,fields,files){
        //处理图片
        var oldPath=files.avatar.path;
        var newPath='./avatar/'+req.session.username+'.jpg';
        fs.rename(oldPath,newPath,function(err){
            if(err){
                res.send('出错了');
                return;
            }

            //缓存图片名称
            req.session.avatar=req.session.username+'.jpg';
            res.redirect('/cutPic');
        })
    });
    return;
}


//显示剪切页面
exports.showCutPic=function(req,res){
    res.render('cut',{
        'avatar':req.session.avatar
    });
}



//剪切图片
exports.doCutPic=function(req,res,next){
    //这个页面接收几个GET请求参数
    //文件名、w、h、x、y
    var filename = req.session.avatar;
    var w = req.query.w;
    var h = req.query.h;
    var x = req.query.x;
    var y = req.query.y;

    //剪裁
    gm("./avatar/"+filename)
        .crop(w,h,x,y)
        .resize(100,100,"!")
        .write("./avatar/"+filename,function(err){
            if(err){
                res.send("-1");
                return;
            }
            //写入数据库
            db.update('user',{'username':req.session.username},{$set:{'avatar':filename}},function(err,result){
                if(err){
                    throw new Error('改头像失败');
                }
                //跳转回首页
                res.send('1');
                return;
            })
        });
};


//处理发表说说业务
exports.doSendContent=function(req,res){
    //需要登录
    if(req.session.login!='1'){
        res.redirect('/login')
        return;
    }
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var content=fields.content;
        var username=req.session.username;
        db.insert('contents',{
            'username':username,
            'dateTime':new Date(),
            'content':content
        },function(err,result){
            if(err){
                res.send('-3');
                return;
            }
            res.send('1');
        })
    });

    return;
}



//列出所有说说
exports.getAllContents=function(req,res){
    var page=req.query.page;
    db.find('contents',{},{'pageAmount':12,'page':page,'sort':{'dateTime':-1}},function(err,result){
        console.log(result);
        res.json({'r':result});
    })
};

//查询用户信息
exports.getUserInfo=function(req,res){
    var username=req.query.username;
    db.find('user',{'username':username},function(err,result){
        res.json({'r':result});
    })
}

//查询内容总数
exports.getContentCount=function(req,res){
    db.getAllCount('contents',function(count){
        res.send(count.toString());
    })
}

//获取个人信息
exports.showUser=function(req,res){
    var user=req.params['user'];
    db.find('contents',{'username':user},function(err,result){
        db.find('user',{'username':user},function(err,result2){
            res.render('user',{
                'login' : req.session.login==='1'?true:false,
                'username':req.session.login==='1'?req.session.username:'',
                'user':user,
                'contents':result,
                'avatar':result2[0].avatar
            });
        })

    })
}