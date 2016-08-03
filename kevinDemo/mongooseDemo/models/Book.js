var mongoose=require('mongoose');
var db= require('./db.js');
var bookSchema=new mongoose.Schema({
    name : {type : String},
    author  : {type : String},
    price : {type : Number}
});
bookSchema.statics.findBooks=function(callback){
    this.model('Book').find({},callback);
}
bookSchema.statics.findBookById=function(_id,callback){
    this.model('Book').find({'_id':_id},callback);
}
bookSchema.statics.updateById=function(_id,callback){
    this.model('Book').update({'_id':_id},callback);
}
var bookModel = db.model('Book',bookSchema);
module.exports=bookModel;