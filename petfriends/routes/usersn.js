const express = require('express')
const router = express.Router()
var csrf = require('csurf');//protection package for accounts

var Order = require('../models/OrderN');
var Cart = require('../models/CartModel');
const WishList = require('../models/WishList');
var auth =require('../config/auth');
var isUser = auth.isUser;

var csrfProtection = csrf();
var passport = require('passport');

const jwt = require ('jsonwebtoken')

//Load model
const UserN = require('../models/UserN')
router.use(csrfProtection);




//hiển thị full account
router.get('/', async(req,res) =>{
    const usersn = await UserN.find().lean().sort({date: -1})
    res.render('usersn/index', {usersn})
})
router.get('/orderdetail/:id',isLoggedIn, async(req, res) => {
    const orderdetails = await Order.findOne({_id : req.params.id}).lean();
    if(orderdetails == [] || !orderdetails )
    {
            return res.write('Error');
    }
    else
    {
        var cart;
        cart = new Cart(orderdetails.cart);
        orderdetails.items= cart.generateArray();
        
    }  
    console.log(orderdetails);

    res.render('usersn/orderdetail',{orderdetails:orderdetails});
}) ;
router.get('/signin',(req, res) => {
    var messages = req.flash('error');
    res.render('usersn/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0,email: req.session.email})
}) ;
router.post('/signin', passport.authenticate('local.signin',{
    //tell password redirect in the success case if signup successfully
    successRedirect:'/usersn/profile',
    failureRedirect: '/usersn/signin',
    failureFlash: true
}),async(req,res,next) =>{    
    if(req.session.oldUrl)
    {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;//clear the session to avoid comming back the order        
        res.redirect(oldUrl);        
    }
    else
    {
        const wishlistqty = await WishList.find({user: req.user}).count();
        req.session.wishlistqty = wishlistqty; 
        res.redirect('/');
    }
});

router.get('/signup',(req, res) => {
    var messages = req.flash('error');
    res.render('usersn/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0})
}) ;
router.post('/signup', passport.authenticate('local.signup',{
    //tell password redirect in the success case if signup successfully
    failureRedirect: '/usersn/signup',
    failureFlash: true    
}),function(req,res,next){
    req.session.email = req.body.email;
    if(req.session.oldUrl)
    {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;//clear the session to avoid comming back the order
        res.redirect(oldUrl);
    }
    else
    {
        res.redirect('/usersn/profile');
    }
    next();
});

router.get('/profile',isLoggedIn,async(req, res, next)=>{   
    const orders = await Order.find({user: req.user._id}).lean();
    const showwishlist = await WishList.find({user: req.user._id}).populate('productId').limit(4).lean();
    if(orders == [] || showwishlist == [] || !orders || !showwishlist)
    {
            return res.write('Error');
    }
    else
    {
        var cart;
        //intialize new cart to access to generate array method
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });   
        
    }  
    res.render('usersn/profile',{orders : orders, showwishlist});
  /*   const showwishlist = await WishList.find({user: req.user._id}).lean();
    if(showwishlist == [] || !showwishlist)
    {
        res.write('Error');
    }
        res.render('usersn/profile',{showwishlist}); */
});
router.get('/wishlist',isLoggedIn, async(req, res) =>{
    const wishlistItem = await WishList.find({user: req.user._id}).populate('productId').lean();  
    const wishlistqty = await WishList.find({user: req.user._id}).count();
    req.session.wishlistqty = wishlistqty;  
    res.render('usersn/wishlist',{wishlistItem: wishlistItem,wishlistqty });
    /* await WishList.find({user: req.user._id}).populate('productId'), function(err, wishlistItem)
    {
        if(err)
        {
            return res.write('Error');
        }
        
    }; */
   
});
router.get('/logout', isLoggedIn, function (req, res, next) {
	req.session.destroy()
	req.logout();
	res.redirect('/');
});
router.use('/',notLoggedIn,function(req, res, next){
    next();
});


module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/usersn/signin');    
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated())
    {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/');    
}