var express=require('express');
var main=express();
var formidable = require('formidable');
var db=require('./model/db.js');

main.set('view engine','ejs');
main.use(express.static('./public'));
main.get('/',function(req,res){
    res.render('index');
})
main.get('/getMessage',function(req,res){
    var page=req.query.page;
    db.find('messageWarp',{},{'pageAmount':5,'page':page},function(err,result){
        res.json({'result':result});
    })
})
main.post('/submitWarp',function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields) {
        db.insert('messageWarp',{
            'username':fields.username,
            'message':fields.message,
            'date':new Date()
        },function(err,result){
            if(err){
                res.json('-1');
                return;
            }
            res.json('1');
        })
    });

    return;
})

main.listen(3000);