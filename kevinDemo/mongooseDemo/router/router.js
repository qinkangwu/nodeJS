var Book = require('../models/Book.js');
exports.addbook=function(req,res){
    res.render('addbook');
}
exports.doadd=function(req,res){
    Book.create(req.query,function(){
        res.redirect('/');
    })
}
exports.showindex=function(req,res){
    Book.findBooks(function(err,result){
        res.render('index',{
            'books':result
        })
    });

}
exports.updatebook=function(req,res){
    Book.findBookById(req.query.id,function(err,result){
        res.render('update',{
            'book':result[0]
        })
    })

}

exports.doupdate=function(req,res){
    Book.updateById(req.query.id,function(err,result){
        res.redirect('/');
    })
}