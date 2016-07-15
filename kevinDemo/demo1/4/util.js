/**
 * util
 * Created by 康武 on 2016/7/15.
 */
var util=require('util');

function Parent(){
    this.name='Parent';
    this.age=66;
    this.say=function(){
        console.log('hello,'+this.name);
    }
}

Parent.prototype.showName=function(){
    console.log(this.name);
}

function Child(){
    this.name='Child';
}
//不能传参  会继承私有属性
//Child.prototype=new Parent();
//推荐
//Child.prototype=Object.create(Parent.prototype);
//第三种 util实现
util.inherits(Child,Parent);
var child=new Child();
child.showName();

//第一个proto指向new Parent()
//第二个pro指向Parent的proto
//第三个proto指向Object.prototype
console.log(child.__proto__.__proto__.__proto__===Object.prototype);


function Person(){
    this.name='kevin';
    this.parent={
        name:'qinkangwu'
    }

}
var p=new Person();

/**
 * param p 代表对象
 * param showHidden(true):是否现实隐藏属性
 * param depth(4):递归深度
 * param colors(true):是否显示颜色
 */
console.log(util.inspect(p,true,1,true));
