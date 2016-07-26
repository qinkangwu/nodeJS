var express=require('express');
var main=express();
var formidable = require('formidable');
var db=require('./model/db.js');
var ObjectId = require('mongodb').ObjectID;

main.set('view engine','ejs');
main.use(express.static('./public'));
main.get('/',function(req,res){
    db.getAllCount('messageWarp',function(count){
        res.render('index',{
            'pageAmount':Math.ceil(count/5)
        });
    })

})
main.get('/delete',function(req,res){
    var id=req.query.id;
    db.delete('messageWarp',{'_id':ObjectId(id)},function(err,result){
        res.redirect()
    })
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