/*
exports.mustLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        req.flash('error','请登录后操作');
        res.redirect('/users/login');
    }
};


exports.notLogin = function(req,res,next){
    if(req.session.user){
        req.flash('error','不能重复登录');
        res.redirect('/');
    }else{
        next();
    }
};*/
