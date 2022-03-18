const express = require("express");
const router = express.Router();
const CartModel = require('../models/CartModel')
const Product = require('../models/Dog');
const mongoose = require('mongoose');

//add to cart
router.get('/:id', function(req, res, next) {
    var productId = req.params.id;
    //var isDetail = req.params.isDetail;
	var cart = new CartModel(req.session.cart ? req.session.cart : [{}]);
   
    //var s = JSON.stringify(req.params, null, 2);
    //console.log("up111: "+isDetail);
   // const price = Product.findById(productId);
    //var quantity = isNaN(req.body.quantity) ? 1: req.body.quantity;
    //var price = isNaN(req.body.priupce) ? 1: req.body.price;    
	Product.findById(productId, function(err, product){
        if(err){
            throw err;
        }
        // console.log("price: "+product.price);
        // console.log("quantity: "+product.quantity);
        product.quantity = 1;
            
        cart.add(product,product.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            backURL=req.header('Referer') || '/';        
            res.redirect(backURL);
           // console.log("cart: "+req.session.cart);
         // res.redirect('/');
    });
});
//update cart
router.post('/:id', function(req, res, next) {
    var productId = req.body.id;
    var quantity = req.body.quantity;
	var cart = new CartModel(req.session.cart ? req.session.cart : [{}]);   
   // console.log("up1: "+req.body.isUpdate);

   // const price = Product.findById(productId);
    //var quantity = isNaN(req.body.quantity) ? 1: req.body.quantity;
    //var price = isNaN(req.body.priupce) ? 1: req.body.price;
    if(req.body.isUpdate){
        Product.findById(productId,quantity, function(err, product){
            if(err){
                throw err;
            }
            // console.log("price: "+product.price);
            // console.log("quantity: "+quantity);
            product.quantity = quantity;
                
            var it1 = cart.update(product.id,quantity);
            //console.log("cartooo1: "+it1.quantity);
            var it = cart.getCartItem(product.id);
                req.session.cart = cart;
            console.log(it)   
            res.send(it) ;
        });
    }

});
router.post('/addwithQuantities/:id', function(req, res, next) {
    var productId = req.body.id;
    var quantity = req.body.quantity;
	var cart = new CartModel(req.session.cart ? req.session.cart : [{}]); 
	Product.findById(productId,function(err, product){
        if(err){
            throw err;
        }
        // console.log("price: "+product.price);
        // console.log("quantity: "+product.quantity);
       // product.quantity = quantity;
            
        cart.updateMany(product,product.id,quantity);
            req.session.cart = cart;
            console.log(req.session.cart);
            backURL=req.header('Referer') || '/';        
            res.redirect(backURL);
           // console.log("cart: "+req.session.cart);
         // res.redirect('/');
    });
});
//add to cart with quantities
/* router.post('/addwithQuantities/:id', function(req, res, next) {
    var productId = req.body.id;
    var quantity = req.body.quantity;
	var cart = new CartModel(req.session.cart ? req.session.cart : [{}]); 
    Product.findById(productId,quantity, function(err, product){
        if(err)
        {
            throw err;
        }
        console.log("co cart: "+ cart);
        console.log("product: "+ product);
        console.log("product.id: "+ product.id);
        product.quantity = quantity;
            cart.updateMany(product, product.id,quantity);
            req.session.cart = cart;
            //console.log("cartooo1: "+it1.quantity);
           /*  var it = cart.getCartItem(product.id);
                req.session.cart = cart; 
           res.send(cart) ;       
    })
}); */
module.exports = router;