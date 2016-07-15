/**
 * Created by 康武 on 2016/7/15.
 */
console.log(process.pid)
process.stdout.write('hello');
process.stdin.on('data',function(data){
    console.log(data.toString());
})