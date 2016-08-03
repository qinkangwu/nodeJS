var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    'id' : Number,
    'name' : String,
    'student':[String]
});

courseSchema.index({'id':1});
var Course = mongoose.model('Course',courseSchema);

module.exports=Course;