var passport = require('passport');
var User = require('../models/UserN');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){//user input with done callback which password will excute once it done.
    done(null, user.id)//return done = null which if you want to store user in session, serialize it by Id and the Id of the user can be retrieved
});//tell passport how to store user in the session

//passing user id as an argument
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);//return error or return the user result
    })
})

//=> this will allow passport to store user in the session or the Id in the session and retrieve the user whenever I need through this stored Id

passport.use('local.signup', new LocalStrategy({
    //tell local passport package that usernameField is key package
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true //which means in my callback i first get the request
}, function( req, email, password, done){
    //check validate and show errors
    req.checkBody('email','Invalid Email').notEmpty().isEmail();
    req.checkBody('password','Invalid Password').notEmpty().isLength({min:4});
    req.checkBody('verifypassword', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();//express-validator
    if(errors){
        var messages = ['Invalid Email' ,'Invalid Password', 'Passwords do not match' ];
        errors.forEach(function(error){
            messages.push(error.msg);
        });        
        //null because didnt get error, false because maybe not success
        return done(null, false, req.flash('error', messages));} 
    //check if the user is already exist
    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err)
        }
        if (req.body.password != req.body.verifypassword) {
           /*  msg = 'Password and Verification do not match.';
            messages.push(msg); */
            req.session.message = {
                type: 'danger',
                intro: 'Password and Verification do not match.',
                message: ''}
        }
        if(user){
            return done(null, false, req.session.message = {
                                        type: 'danger',
                                        intro: 'Email is already exist',
                                        message: 'Please Try Again'});
            //k có error nhưng k thành công bởi vì email đã tồn tại rồi
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.role = 'visitor';
        newUser.save(function(err, result){
            if(err)
            {
                return done(err);
            }
            return done(null, newUser)// return none error and new user 
        })
    }).lean();
}));//two argument for LocalStrategy: JS Object and callback function


passport.use('local.signin',new LocalStrategy({
     //tell local passport package that usernameField is key package
     usernameField: 'email',
     passwordField: 'password',
     passReqToCallback : true, //which means in my callback i first get the request
 }, async ( req, email, password, done) => {
     //check validate and show errors
     req.checkBody('email','Invalid Email').notEmpty().isEmail();
     req.checkBody('password','Invalid Password').notEmpty();
     var errors = req.validationErrors();
     if(errors){
         var messages = ['Invalid Email' , 'Invalid Password'];
         errors.forEach(function(error){
          messages.push(error.msg);});
         //null because didnt get error, false because maybe not success
         return done(null, false, req.flash('error', messages));
        } 
    //check if the user is already exist
    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false, req.session.message = {
                                        type: 'danger',
                                        intro: 'No User Found',
                                        message: 'Please Try Again'});
        }
        if(!user.validPassword(password)){
            return done(null, false, req.session.message = {
                                        type: 'danger',
                                        intro: 'Wrong Password',
                                        message: 'Please Try Again'});
        }
        
        return done(null, user)
    }).select("+password")
}));
// select("+password")
