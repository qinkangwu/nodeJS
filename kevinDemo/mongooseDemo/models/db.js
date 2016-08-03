var mongoose=require('mongoose');
var db=mongoose.createConnection('mongodb://127.0.0.1:27017/bookSystem');


db.once('open',function(callback){
    console.log('数据库链接成功');
})

module.exports=db;