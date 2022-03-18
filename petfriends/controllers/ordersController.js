const Order = require('../models/OrderN');
const CartModel = require('../models/CartModel')
exports.getOrder = async (req, res) => {
  try 
  {
    var cart = new CartModel(req.session.cart);     
    var products = cart.generateArray();  
    if(!products){
      cart.empty();
      res.render('shop/emptycart');}
    else{
      var cart = new CartModel(req.session.cart);
      res.render('shop/orders', {products:cart.generateArray(),getTotalPrice:cart.getTotalPrice(),title: 'My Orders'}); 
    }
   
   
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.sendOrder = async (req, res) => {
    try 
    {
      if(!req.session.cart){
        //pass product to null to check if there any product or not
      return res.render('shop/shopping-cart',{products:null})};
      const {address, phone, paymentMethod} = req.body;
      let errors = [];
      if(!address) errors.push({msg: 'Title Required'});
      if(!phone) errors.push({msg: 'Text required'});
      if(!paymentMethod) errors.push({msg: 'Please select your payment method.'});
      var cart = new CartModel(req.session.cart);
      var order = new Order({
        user: req.user,
        cart: cart,
        //express store values sent with post request
        address:req.body.address,
        phone: req.body.phone,
        paymentMethod: req.body.paymentMethod
      });
      await order.save(function(err, result){
        if(err){
          throw err;
        }
       // req.flash('successMessage', 'Successfully Order');
        req.session.cart = null;
        res.render('success');
      })
      
     
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };