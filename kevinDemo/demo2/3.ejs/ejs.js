/**
 *
 * Created by 康武 on 2016/7/19.
 */
var ejs=require('ejs');
var str='hello <%= s %>';
var data={
    s : 'world'
}
var html=ejs.render(str,data);
console.log(html);

