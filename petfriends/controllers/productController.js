const Product = require('../models/Product');
const Category = require('../models/Category');
const CustomError = require("../utilities/CustomError")
const Dog = require('../models/Dog');
const Category2 = require('../models/Category-2');
const Img = require('../models/ProductImage');
const WishList = require('../models/WishList');
const asyncMiddleware = require('../middlewares/asyncMiddleware')
//To Get All Product
exports.getProducts = asyncMiddleware(async (req, res, next) =>{
       
        res.status(200).json(res.moreResults);
        /* const prod = await Product.find({}).populate(
            {
                path: 'category',
                select:'title'
            }
        ); //array of products
        //res.json({products:prod});
        //res.json({error:'Something went wrong'})
        //500 stands for http error code
        //next(new CustomError('Something went wrong', 500));
        if(!prod){
            const error = new CustomError(`Cannot find any products.` , 500);
            res.status(error.statusCode).json({
                success: false,
                error: error.message
            })
        }
        res.status(200).json({
            success: true,
            count: prod.length,
            products: prod
        });     */
});

//Get Single Product From Database
exports.getSingleProduct = async (req, res) =>{
        //fetch id from parameter
        const prodId = req.params.id;
        const prod = await Product.findById(prodId);
        //check if product availables
        if(prod){
            res.json({product: prod});
        } else {
            res.json({message:'Product not found'})
        }

}

exports.createProduct = async (req,res)=>{
    const product = await Product.create(req.body);

    //if the product is sent
    if (product) {
        res.status(200).json(body,{
            success: true,
            product: product
        })
    }

}
exports.getProductsA = async (req, res) => {
    try 
    {   
      const allProducts = await Dog.find({}).lean();
      const dog_cate = await Category.findOne({"title": "Dogs"}).lean() ;
      const cat_cate =await Category.findOne({"title": "Cats"}).lean();
      const other_cate =await Category.findOne({"title": "Others Pet"}).lean();
  
      const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean();
      const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean();
      const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean();
      var categories =await Category.find({}).populate('subcategory').lean(); 
     
      res.render('products/products', {allProducts,categories,dog_subcate,cat_subcate,other_subcate, dog_cate,cat_cate,other_cate,title: 'View All'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  exports.getProductById = async (req, res) => {
    try 
    {
      const categories =await Category.find({}).lean();
  
      const dog_cate = await Category.findOne({"title": "Dogs"}).lean() ;
      const cat_cate =await Category.findOne({"title": "Cats"}).lean();
      const other_cate =await Category.findOne({"title": "Others Pet"}).lean();
  
      const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean();
      const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean();
      const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean();
      const dogs = await Dog.find({"categoryid":"5d725a4a7b292f5f8ceff789"}).lean();
      
      const categoryId = await Category.findOne({_id:req.params.id}).lean();
      const categoryId2 = await Category.findOne({_id:req.params.id}).lean(); 

     // const productId = await Dog.find({categoryid:categoryId}).sort({price:-1}).lean(); 
    // const productId2 = await Dog.find({categoryid:categoryId}).sort({price:1}).lean();
     // const hightoLowCate = await Dog.find({categoryid:categoryId}).sort({price:-1}).lean(); 
      var sort = req.query.sort;
      if(!sort || sort == 'categoryId')
      {
        var productId = true;
        productId = await Dog.find({categoryid:categoryId}).sort({price:-1}).lean(); 
        var productId2 = false
      }     
      else
      {
        if(sort == 'categoryId2'){
            var productId2 = true;
            productId2 = await Dog.find({categoryid:categoryId2}).sort({price:1}).lean();
            var productId = false; 
        }
      }
      res.render('products/moreProducts',{categoryId2,productId,productId2,dogs,categoryId ,categories, dog_subcate,cat_subcate,other_subcate, dog_cate,cat_cate,other_cate});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  exports.getSubProductById = async (req, res) => {
    try 
    {
      const categories =await Category.find({}).lean()
  
      const dog_cate = await Category.findOne({"title": "Dogs"}).lean() 
      const cat_cate =await Category.findOne({"title": "Cats"}).lean()
      const other_cate =await Category.findOne({"title": "Others Pet"}).lean()
  
      const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean()
      const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean()
      const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean()
      const dogs = await Dog.find({"categoryid":"5d725a4a7b292f5f8ceff789"}).lean()
      //load subcate
      const subcategoryId = await Category2.findOne({_id:req.params.id}).lean()      
     const subproductId = await Dog.find({subcategoryid:subcategoryId}).lean()
      
      //load and sort sub cate base on click
      const subcategoryIdLTH = await Category2.findOne({_id:req.params.id}).lean()      
      const subcategoryIdHTL = await Category2.findOne({_id:req.params.id}).lean()      

      var sort = req.query.sort;
      if(!sort || sort == 'subcategoryIdLTH')
      {
        var subproductIdLTH = true;
        subproductIdLTH = await Dog.find({subcategoryid:subcategoryIdLTH}).sort({price:1}).lean()
        var subproductIdHTL = false
      }     
      else
      {
        if(sort == 'subcategoryIdHTL'){
            var subproductIdHTL = true;
            subproductIdHTL = await Dog.find({subcategoryid:subcategoryIdHTL}).sort({price:-1}).lean()
            var subproductIdLTH = false; 
        }
      }


      res.render('products/subCategory',{subcategoryIdLTH,subcategoryIdHTL ,subproductIdHTL,subproductIdLTH,dogs,subcategoryId,subproductId, categories, dog_subcate,cat_subcate,other_subcate, dog_cate,cat_cate,other_cate})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  exports.getProdetailById = async (req, res) => {
    try 
    {   
      const dog_cate = await Category.findOne({"title": "Dogs"}).lean() ;
      const cat_cate =await Category.findOne({"title": "Cats"}).lean();
      const other_cate =await Category.findOne({"title": "Others Pet"}).lean();
  
      const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean();
      const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean();
      const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean();

      const prodetailImg = await Dog.find({_id:req.params.id}).lean()

      const prodetail = await Dog.findOne({_id:req.params.id}).lean();
      const prodimg = await Img.find({productid:prodetail}).lean()
      res.render('products/product-details',{prodetailImg,prodetail,prodimg, dog_subcate,cat_subcate,other_subcate, dog_cate,cat_cate,other_cate})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  exports.getSortPrice = async (req, res) => {
    try 
    {   
      const dog_cate = await Category.findOne({"title": "Dogs"}).sort({ price: -1 }).lean() 
      const cat_cate =await Category.findOne({"title": "Cats"}).lean()
      const other_cate =await Category.findOne({"title": "Others Pet"}).lean()

      const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean()
      const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean()
      const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean()
      var sort = req.query.sort;
      //sort all products
      if (!sort || sort == 'hightoLow')
      {
          var hightoLow = true;
          hightoLow = await Dog.find({}).sort( { price: -1 } ).lean();
          var lowtoHigh = false
      }
      else{
          if(sort == 'lowtoHigh'){
              var lowtoHigh = true;
              lowtoHigh = await Dog.find({}).sort( { price: 1 } ).lean();
              var hightoLow = false; 
          }
      }
      res.render('products/sortprice', {hightoLow, lowtoHigh, dog_cate, cat_cate, other_cate,dog_subcate,cat_subcate,other_subcate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
