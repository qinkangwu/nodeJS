var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    'id' : Number,
    'name' : String,
    'student':[String]
});

courseSchema.index({'id':1});
courseSchema.statics.addStudent=function(idArray,name,callback){
    for(var i = 0 ; i<idArray.length;i++){
        Course.update({'id':idArray[i]},{$push:{'student':name}},function(){

        })
    }
}
var Course = mongoose.model('Course',courseSchema);

module.exports=Course;