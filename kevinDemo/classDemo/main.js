var express=require('express');
var formidable=require('formidable');
var db=require('./model/db.js');


var main=express();
main.set('views engine','ejs');

main.get('/register',function(req,res){
    res.render('index');
})
main.get('/login',function(req,res){
    res.render('login');
})

main.post('/doRegister',function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        db.md5(fields.password,function(password){
            db.insert('user',{
                'username':fields.username,
                'password':password
            },function(err,result){
                if(err){
                    res.send('-1');
                    return;
                }
                res.send('1');
            })
        })
    });

    return;
})

main.post('/doLogin',function(req,res){
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        db.md5(fields.password,function(password){
            var username=fields.username;
            db.find('user',{
                'username':username
            },function(err,result){
                if(err){
                    res.send('-3');
                }else if(result.length==0){
                    res.send('-2');
                }else if(password!=result[0].password){
                    res.send('-1');
                }else{
                    res.send('1');
                }
            })
        })
    });

    return;
});
main.listen(3000);
