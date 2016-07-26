/**
 * Created by Administrator on 2016/7/20.
 */
var express=require('express');
var app=express();
var controller=require('./controller/router.js');

app.set('views engine','ejs');
app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.get('/',controller.showIndex);
app.get('/up',controller.showUp);
app.get('/:albumName',controller.showAlbumName);
app.post('/up',controller.doPost);
app.use(function(req,res){
    //console.log(req.pathname);
    res.render('err');
});
app.listen(3000);