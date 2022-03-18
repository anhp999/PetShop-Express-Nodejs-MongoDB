exports.isUser = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash('danger','Please Log In.');
        res.redirect('/usern/signin');
    }
}

exports.isAdmin = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash('danger','Please Log In.');
        res.redirect('/usern/signin');
    }
}