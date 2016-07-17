/**
 *
 * Created by Administrator on 2016/7/17.
 */
var Emiter=require('events');
var fs=require('fs');
var person={};
var eve=new Emiter();
eve.on('name',out);
eve.on('age',out);
fs.readFile('name.txt','utf8',function(err,data){
    person.name=data;
    eve.emit('name');
})
fs.readFile('age.txt','utf8',function(err,data){
    person.age=data;
    eve.emit('age');
})
function out(){
    if(person.name&&person.age){
        console.log(person.name+' '+person.age)
    }
}
