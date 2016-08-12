var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://127.0.0.1:27017/kevin');
mongoose.model('User',new mongoose.Schema({
    'username' : {type : String,required : true},
    'email' : {type : String , required: true},
    'password' : {type : String , required:true},
    'avatar' : {type : String , required:true}
}));

mongoose.model('Article',new mongoose.Schema({
    'title' : {type : String,required : true},
    'content' : {type : String , required: true},
    'createDate' : {type : Date , default : Date.now},
    'user' : {type : ObjectId , ref : 'User' }
}));
global.Model = function(type){
    return mongoose.model(type);
};