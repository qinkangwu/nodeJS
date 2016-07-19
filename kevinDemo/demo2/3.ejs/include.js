/**
 *
 * Created by 康武 on 2016/7/19.
 */
var ejs=require('ejs');
var fs=require('fs');

fs.readFile('./index.ejs',function(err,data){
    var template=data.toString();
    var dictionary ={
        s:'world'
    }

    var html=ejs.render(template,dictionary);

    console.log(html);
})
