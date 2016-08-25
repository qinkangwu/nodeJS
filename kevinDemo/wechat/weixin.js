'use strict';

var config = require('./config');
var Wechat = require('./wechat2/wechat.js');

var wechatApi = new Wechat(config.wechat);

exports.reply=function* (next){
    var message = this.weixin;
    //console.log('message='+message);
    if(message.MsgType === 'event'){

        if(message.Event === 'subscribe'){
            if(message.EventKey){
                console.log('扫描二维码:'+ meesage.EventKey +'  '+ message.ticket);
            }

            this.body = '哦哦哦哦哦哦哦哦哦哦哦哦\r\n'+'消息ID'+message.MsgId;
        }else if(message.Event === 'unsubscribe'){
            console.log('无情!');
            this.body='';
        }else if(message.Event === 'LOCATION'){
            this.body = '你上报的位置是'+message.Latitude + '/' + message.Longitude + '-' +message.Precision;
        }else if(message.Event === 'CLICK'){
            this.body = '你点击了菜单'+ message.EventKey;
        }else if(message.Event === 'SCAN'){
            console.log('关注后扫二维码'+message.EventKey+' '+message.Ticket);
            this.body = '看到扫一下';
        }else if(message.Event === 'VIEW'){
            this.body = '你点击的菜单链接是:'+ message.EventKey
        }

    }else if(message.MsgType === 'text'){
        var content = message.Content;
        var reply = '二毛敲的代码太辣鸡了，无法理解你输入的'+message.Content+'指令,输入1,2,3,4';

        if(content === '1'){
            reply = '你是一个草包';
        }else if(content === '2'){
            reply = '你们是两个草包'
        }else if(content === '3'){
            reply = [{
                title :'哦',
                description : '描述。。。。。',
                picUrl : 'http://img.woyaogexing.com/touxiang/katong/20131031/2d547b4967837e02.jpg!200X200.jpg',
                url : 'http://www.baidu.com'
            },{
                title :'nodeJS 开发微信',
                description : '描述。。。。。',
                picUrl : 'http://img.woyaogexing.com/touxiang/katong/20131031/2d547b4967837e02.jpg!200X200.jpg',
                url : 'http://www.baidu.com'
            }]
        }else if(content === '4'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
            //console.log(data);
            reply = {
                type : 'image',
                mediaId : data.media_id
            }
        }else if(content === '5'){
            var data = yield wechatApi.uploadMaterial('video',__dirname+'/5.mp4');
            console.log(data)
            reply = {
                type : 'video',
                title : '回复视频内容',
                description : '小视频',
                mediaId : data.media_id
            }
        }
        this.body = reply;
    }

    yield next;
};