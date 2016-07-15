/**
 * Created by 康武 on 2016/7/15.
 */
//同步事件队列,让B在队列底部
console.log('a');

//第一种方法
/*setTimeout(function(){
    console.log('b');
},0)*/

//第二种方法 优先级大于timeout
process.nextTick(function(){
    console.log('b');
})

console.log('c');
console.log('d');



