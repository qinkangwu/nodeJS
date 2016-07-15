/**
 *
 * Created by 康武 on 2016/7/15.
 */

/*process.argv.forEach(function(val,index,array){
    console.log(val,index,array);
})*/

//杀死进程
/*process.kill(12656);*/

//进程退出调用此函数
/*process.on('exit',function(){
    console.log('退出前执行');
})*/


process.chdir('e:/kevin');//改变当前目录
console.log(process.cwd());//当前工作目录

