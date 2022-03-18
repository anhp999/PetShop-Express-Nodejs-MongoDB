const Product = require('../models/Dog');
const WishListModel = require('../models/WishListModel');
const WishList =require('../models/WishList');
const WishListSession =require('../models/WishListModel');
const Category = require('../models/Category');
const Category2 = require('../models/Category-2');


exports.addWishListToSession = async (req, res) => {
  try 
  {      
    var productId = req.params.id;
    var wishlistcart = new WishListModel(req.session.wishlistcart ? req.session.wishlistcart : [{}] );
    Product.findById(productId, function(err, product){
      if(err){
          throw err;
      }
      product.quantity = 1;          
      wishlistcart.add(product,product.id);
          req.session.wishlistcart = wishlistcart;
          console.log(req.session.wishlistcart); 
         // console.log("cart: "+req.session.cart);
         res.redirect('/products')}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addtowishList = async (req, res) => {
    try 
    { 
      const {productId, price, isWish } = req.body;

      if(!productId){ console.log('Dont Have ProductId')}
      if(!price) { console.log('Dont Have Price')}
      else
      {
        WishList.find(productId, price, isWish,function(err, product)
        {
          if (error) {
            return res.status(401).json({
                message: 'Not able to add to wish list'
            });
          }
          else
          {
            var wishlistItem = new WishList({
              user: req.user,
              productId : productId,
              price: price,
              isWish : 0,
              quantity:1});
              wishlistItem.save(function(err, result)
              {
                if(err){throw err;}
                else{
                  console.log(result);
                 res.redirect('/products'); 
                }
              });     
          }          
        })
       res.redirect('/');  
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }   
      

exports.removeItem = async (req, res) => {
  try 
  {      
    const dog_cate = await Category.findOne({"title": "Dogs"}).lean() 
    const cat_cate =await Category.findOne({"title": "Cats"}).lean()
    const other_cate =await Category.findOne({"title": "Others Pet"}).lean()

    const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean()
    const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean()
    const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean()   
    if(req.session.wishlistcart == undefined){
      req.session.wishlistcart = null;
    }
    if(!req.session.wishlistcart){
        //pass product to null to check if there any product or not
        return res.render('wishlist',{dog_cate, cat_cate, other_cate,dog_subcate,cat_subcate,other_subcate,products:null})
    }
    var productId = req.params.id;
    var wishlistcart = new WishListModel(req.session.wishlistcart);
    Product.findById(productId, function(err, product)
        {
            if(err){throw err;}            
            else{
                wishlistcart.remove(product.id);
                req.session.wishlistcart = wishlistcart;
               // console.log(req.session.cart);
                res.redirect('/wishlist');  
            } 
            
        });   
    await WishList.findOneAndRemove({_id: req.params.id}).lean();
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};