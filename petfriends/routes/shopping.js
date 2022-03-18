const express = require("express");
const router = express.Router();
const CartModel = require('../models/CartModel')
const Product = require('../models/Dog');
const mongoose = require('mongoose');
const {sendOrder, getOrder} = require('../controllers/ordersController');
const {getToCart, deleteItem} = require('../controllers/cartController');

router.get('/shopping-cart',getToCart)
router.get('/orders',isLoggedIn ,getOrder)
router.get('/emptycart', async(req,res) =>{
    res.render('shop/emptycart')
})

router.get('/:id',deleteItem)

router.post('/',isLoggedIn ,sendOrder);

module.exports = router;
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/usersn/signin');    
}

/* router.get('/shopping-cart', function(req,res,next){
    //  console.log("cart: "+req.session.cart);
      if(req.session.cart == undefined){
          req.session.cart = null;
      }
      if(!req.session.cart){
          //pass product to null to check if there any product or not
          return res.render('shop/shopping-cart',{products:null})
      }
      var cart = new CartModel(req.session.cart);
      //var products1 = cart.generateArray();
      res.render('shop/shopping-cart',{products:cart.generateArray(),getTotalPrice:cart.getTotalPrice(),totalPrice:cart.totalPrice, totalQuantity:cart.totalQuantity});//get the list of the products in the cart
     // for(var item in products1){
     // console.log("length: "+item.price);
  
      //console.log("length: "+products[1].price);
      //console.log("length: "+products[1].quantity);
  }) */
  /* router.delete('/:id', function(req,res){
    var productId = req.params.id;
	var cart = new CartModel(req.session.cart ? req.session.cart : {});
	Product.findById(productId, function(err, product){
        if(err){
            throw err;
        }
            cart.remove(product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
    });

 
    router.get('/:id', function(req,res){
       var productId = req.params.id;
    var cart = new CartModel(req.session.cart);
        if(!req.session.cart){
            //pass product to null to check if there any product or not
        return res.render('/',{products:null})}
        Product.findById(productId, function(err, product)
        {
            if(err){throw err;}
            cart.remove(product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/shop/shopping-cart');  
        });       
    }); */