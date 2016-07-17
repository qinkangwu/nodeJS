/**
 *
 * Created by Administrator on 2016/7/17.
 */

var EventEmiter=require('events');
var util=require('util');
function Bell(name){
    this.name=name;
}
util.inherits(Bell,EventEmiter);
var jingleBell=new Bell('jingleBell');
jingleBell.on('ring',function(){
    console.log('收到礼物1');
})
jingleBell.addListener('ring',function(){
    console.log('收到礼物2');
})
//jingleBell.removeAllListeners('ring');
var drop=function(who){
    console.log(who+'的铃铛不见了');
}
jingleBell.once('drop',drop);
//jingleBell.removeListener('drop',drop);
jingleBell.emit('ring');
jingleBell.emit('drop','圣诞老人');
console.log(jingleBell.listeners('ring'));
