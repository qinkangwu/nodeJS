var settings=require('../settings');
var MongoClient = require('mongodb').MongoClient;


/**
 * 链接数据库
 * @param callback 链接之后的回调函数
 * @private
 */
function __connectDB(callback){
    var url=settings.dbUrl;
    MongoClient.connect(url,function(err,db){
        if(err){
            callback(err,null);
        }

        callback(err,db);

    })
}


/**
 * 插入操作
 * @param collectionName 要操作collection的名字
 * @param json 需要插入的数据
 * @param callback 插入之后的回调函数
 */
exports.insert=function(collectionName,json,callback){
        __connectDB(function(err,db){
            db.collection(collectionName).insertOne(json,function(err,result){
                callback(err,result);
                db.close();
            })
        })
}


/**
 * 花式查找数据
 * @param collectionName 要操作collection的名字
 * @param json 精确查找
 * @param C 如果参数是3个 C就是callback
 * @param D 如果参数是4个 D就是分页查找
 */
exports.find=function(collectionName,json,C,D){
    var result=[];
    if(arguments.length==3){
        var callback=C;
        var skipNumber=0;
        var limit=0;
    }else if(arguments.length==4){
        var callback=D;
        var args=C;
        var skipNumber=args.pageAmount * args.page || 0;
        var limit= args.pageAmount || 0;
        var sort=args.sort || {};
    }else{
        throw new Error('find函数的参数必须是3个或者4个');
        return;
    }

    __connectDB(function(err,db){
        var cursor=db.collection(collectionName).find(json).skip(skipNumber).limit(limit).sort(sort);
        cursor.each(function(err,doc){
            if(err){
                callback(err,null);
                db.close();
                return;
            }

            if(doc!=null){
                result.push(doc);
            }else{
                callback(null,result);
                db.close();
            }
        })
    })
}


/**
 * 删除数据操作
 * @param collectionName 要操作collection的名字
 * @param json 精确删除的对象
 * @param callback 删除之后的回调
 */
exports.delete=function(collectionName,json,callback){
    __connectDB(function(err,db){
        db.collection(collectionName).deleteMany(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}


/**
 * 更新数据操作
 * @param collectionName 要操作collection的名字
 * @param json1 改什么
 * @param json2 怎么改
 * @param callback 更新之后的回调函数
 */
exports.update=function(collectionName,json1,json2,callback){
    __connectDB(function(err,db){
        db.collection(collectionName).updateMany(json1,json2,function(err,result){
            callback(err,result);
            db.close();
        })
    })
}


/**
 * 获取数据总数
 * @param collectionName 要操作collection的名字
 * @param callback 获取之后的回调函数
 */
exports.getAllCount=function(collectionName,callback){
    __connectDB(function (err, db) {
        db.collection(collectionName).count({}).then(function(count) {
            callback(count);
            db.close();
        });
    })
}


