const express = require("express");
const router = express.Router();
const Product = require('../models/Dog');
const mongoose = require('mongoose')

//const {getCart} = require('../controllers/cartController')
router.get('/', (req,res)=>{
    //gọi cart ra
    var cart = req.session.cart;
    //truyền cart ra giao diện
    res.locals.cart = cart.getCart();

});
router.post('/', (req,res,next)=>{
    var productId = req.body.id;
     //nếu như k phải là số thì mặc định là 1, ngược lại thì là giá trị hiện có
     var quantity = isNaN(req.body.quantity) ? 1: req.body.quantity;
     Product.findById(productId)
     //nếu như add đúng sản phẩm
     .then(product => {
         //gọi cart ra xong add sản phẩm vào
         var cartItem = req.session.cart.add(product, productId, quantity);
         console.log(cartItem);
         res.json(cartItem);
     })
     .catch(error => next(error));
});
 

module.exports = router;