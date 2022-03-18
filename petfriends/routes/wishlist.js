const express = require("express");
const router = express.Router();
const Product = require('../models/Dog');
const WishList = require('../models/WishList');


router.post('/product/add',isLoggedIn, async (req, res) =>
    {
            const title = req.body.title;
            const productId = req.body.id;
            const price = req.body.price;   

            var existingProduct = await WishList.findOne({productId:productId});
        if(existingProduct)
        {
            var existedProduct = existingProduct.productId;
            if(existedProduct == productId)
            {
                req.session.message = {
                    type: 'warning',
                    intro: 'You already added this product',
                    message: ''
                }
                return res.redirect('/products');
            }            
        }         
        else
        {            
            const newWish = new WishList({
                title : title,
                productId: productId,
                user : req.user,
                price : price, 
                quanity : 1, 
                isWish : 0})
            newWish.save(async(err, newwishList) => {
                if (err) { res.status(500).send({error: 'Error: could not add item to Wishlist'});} 
                else {
                    req.session.message = {
                        type: 'success',
                        intro: 'Successfully Added',
                        message: ''}
                        console.log(newwishList);                              
                        const wishlistqty = await WishList.find({user: req.user}).count();
                        req.session.wishlistqty = wishlistqty; 
                        return res.redirect('/products');
                    }})  
        }                                        
    });
router.delete('/delete/:id',isLoggedIn, async (req, res) => 
{
    await WishList.findOneAndRemove({_id:req.params.id}).lean();
    res.redirect('/usersn/wishlist')
});
module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/usersn/signin');    
}