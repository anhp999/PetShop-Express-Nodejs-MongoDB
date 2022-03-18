const CartModel = require('../models/CartModel')
const Product = require('../models/Dog');
const Category = require('../models/Category');
const Category2 = require('../models/Category-2');
exports.getToCart = async (req, res) => {
  try 
    {
        const dog_cate = await Category.findOne({"title": "Dogs"}).lean() 
        const cat_cate =await Category.findOne({"title": "Cats"}).lean()
        const other_cate =await Category.findOne({"title": "Others Pet"}).lean()
  
        const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean()
        const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean()
        const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean()
        if(req.session.cart == undefined){
            req.session.cart = null;
        }
        if(!req.session.cart){
            //pass product to null to check if there any product or not
            return res.render('shop/shopping-cart',{dog_cate, cat_cate, other_cate,dog_subcate,cat_subcate,other_subcate,products:null})
        }
        var cart = new CartModel(req.session.cart);
        //var products1 = cart.generateArray();
        res.render('shop/shopping-cart',{dog_cate, cat_cate, other_cate,dog_subcate,cat_subcate,other_subcate, products:cart.generateArray(),getTotalPrice:cart.getTotalPrice(),totalPrice:cart.totalPrice, totalQuantity:cart.totalQuantity});//get the list of the products in the cart
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.deleteItem = async (req, res) => {
    try 
    {
        var productId = req.params.id;
        var cart = new CartModel(req.session.cart);     
        //var products = cart.generateArray();   
        Product.findById(productId, function(err, product)
        {
            if(err){throw err;}
            if(!req.session.cart){
                cart.empty();
                res.render('shop/emptycart',{products:null});
            }
            else{
                cart.remove(product.id);
                req.session.cart = cart;
               // console.log(req.session.cart);
                res.redirect('/shop/shopping-cart');  
            } 
            
        });    
        if(!req.session.cart){
            //pass product to null to check if there any product or not
        return res.render('shop/emptycart',{products:null})}
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };