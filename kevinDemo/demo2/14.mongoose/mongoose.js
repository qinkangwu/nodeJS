var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/kevin');
db.connection.on('err',function(err){
    console.log('数据库连接失败'+err);
});
db.connection.on('open',function(){
    console.log('数据库连接成功');
});

var PersonSchema = new mongoose.Schema({
    name : { type : String},
    age : { type : Number , default : 0},
    time : { type : Date , default : Date.now},
    Email : { type : String , default : '' }
});
PersonSchema.method('sayHello',function(){
    console.log('hello world');
});

PersonSchema.static('findByName',function(name,callback){
    return this.find({name : name},callback);
});
var PersonModel = db.model('person',PersonSchema);

var PersonEntity = new PersonModel({
    name : 'kevin',
    age : 22 ,
    Email : '908439787@qq.com'
});

/*PersonEntity.save(function(err,doc){
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }

});*/
PersonEntity.sayHello();

/*PersonModel.find({},function(err,doc){
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }

});*/

/*
 var condition = {'name' : 'kevin'};
 PersonModel.remove(condition,function(err,doc){
 if(err){
 console.log(err);
 }else{
 console.log(doc);
 }

 });*/

/*PersonModel.find({},null,{skip:3,limit:3,sort:{age:-1}},function(err,doc){
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }

});*/
PersonModel.findByName('kevin',function(err,doc){
    console.log(doc);
});
