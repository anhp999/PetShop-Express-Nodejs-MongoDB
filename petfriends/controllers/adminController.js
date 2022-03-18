const Product = require('../models/Dog');
const Category = require('../models/Category');
const Category2 = require('../models/Category-2');
const User = require('../models/UserN');
const Order = require('../models/OrderN');
const UploadImage = require('../models/ProductImage');
var Cart = require('../models/CartModel');
const Message = require('../models/Message');
const fs = require('fs');

//paginate bị lỗi
exports.CountAll = async (req, res) => {
    try
    {
        var countProducts = await Product.count().lean();
        var countOrders = await Order.count().lean();
        var countUsers = await User.count().lean();

        var categories =await Category.find({}).populate('subcategory').lean();  

        const messageQty = await Message.find({}).count();
       req.session.messageQty = messageQty; 
       // var findallProducts = await Product.find({}).lean();
        const page = parseInt(req.query.page, 10) || 1;    
        const limitPerPage = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1)* limitPerPage; 
        const endIndex = page * limitPerPage; 

        var findallProducts = await Product.find({})
            .skip(startIndex)
            .limit(limitPerPage)
            .lean()
            .exec();
            productCate = false;
        var total = await Product.countDocuments();  

        const findAllOrders = await Order.find({}).populate('user').lean();
       // const findAllUsers = await User.find({}).lean();
        //filter users
        var filter = req.query.filter;
        if(filter == 'admin')
        {
            var filterAdmin = true;
            filterAdmin=  await User.aggregate([
                { 
                    $match : 
                    { 
                        role : "admin"
                    }
                    
                },
                ]);
            var filterVisitor = false;
            findAllUsers = false;
        }
        else if(filter == 'visitor')
        {
            var filterVisitor = true;
            filterVisitor=  await User.aggregate([
                { 
                    $match : 
                    { 
                        role : "visitor"
                    },
                },
                ]);
            var filterAdmin = false;
            findAllUsers = false;      
            console.log(filterVisitor);  
        }
        else
        {
            if(!filter)
            {
                var findAllUsers = true;
                findAllUsers = await User.find({}).lean();
                var filterAdmin = false;
                var filterVisitor = false;
            }
            

        }
        
        

        res.render('admin', {layout: 'admin.handlebars', 
                            pagination: { page: page, limit:limitPerPage, totalRows : Math.ceil(total/page)},
                            findallProducts,
                            findAllOrders,
                            findAllUsers,
                            categories,
                            countProducts, countOrders, countUsers,
                            filterAdmin, filterVisitor, })
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.deleteProduct = async (req, res) => {
    try
    {
        await Product.findOneAndRemove({_id: req.params.id}).lean();
        res.redirect('/admin');
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};

exports.getCate = async (req, res) => {
    try
    {
        
        var countOrders = await Order.count().lean();
        var countUsers = await User.count().lean();

        var categories =await Category.find({}).populate('subcategory').lean();  
        
        var categoryId = await Category.findOne({_id:req.params.id}).lean();
        var productCate = await Product.find({categoryid:categoryId}).lean();
        var countProducts = await Product.find({categoryid:categoryId}).count().lean();

        res.render('admin/adminCate', {categories,productCate,countProducts, countOrders, countUsers,categoryId})
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
//not yet
exports.searchCate = async(req,res)=>{
    try
    {
        let cateload = req.body.cateload.trim();
        let searchKeyCate = await Product.find({name:{$regex: new RegExp('^'+cateload+'.*','i')}}).lean();
       /*  var cateId = await Category.findOne({_id:req.params.id});
        let searchKeyCate = await Product.find({categoryid: cateId ,name:{$regex: new RegExp('^'+cateload+'.*','i')}}).exec(); */                                                            
        //Limit search results to 10
        searchKeyCate = searchKeyCate.slice(0,10);//the result will turn back with array so use "slice" it
        console.log(searchKeyCate);
        console.log(categoryId);
        res.send({cateload : searchKeyCate});
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.gettoAdd = async (req, res) => {
    try
    {           
       var categories =await Category.find({}).populate('subcategory').lean();

      /*   const categoryId = await Category.findById({_id:req.params.id}).lean();
        const subCategoryId = await Category2.findById({_id:req.params.id}).lean();
        subCategoryId.Category = categoryId; */


        //populate success: var subcategory = await Category2.find({}).populate('category').lean();
        var categoryid = await Category.find({}).lean();
        var subcategoryid = await Category2.find({}).populate('category').lean();
        res.render('admin/addnewProduct', {layout: 'admin.handlebars',subcategoryid, categoryid,categories})
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.addnewProduct = async (req, res, next) => {
    try
    {    
       const files = req.files; 
       const name = req.body.name;
       const desc = req.body.desc;
       const price = req.body.price;
       const categoryid = req.body.categoryid;
       const subcategoryid = req.body.subcategoryid;
       
       console.log('get from body: '+ name, desc, price, categoryid, subcategoryid)
       let errors = [];
        if(!name) errors.push({msg: 'Name Required'})
        if(!desc) errors.push({msg: 'Description required'})
        if(!price) errors.push({msg: 'Price required'})
        if(!categoryid) errors.push({msg: 'Category required'})
        if(!subcategoryid) errors.push({msg: 'Subcategory required'}) 
       // if(errors.length > 0) res.render('admin/addnewProduct',{name, desc, price,categoryid,subcategoryid})
        if(!files)
        { 
            req.session.message = {
                type: 'danger',
                intro: 'Something Wrong !!!',
                message: 'Please Try Again.'
            }
            const error = new Error('Please Choose Images');
            error.httpStatusCode = 400;
            return next(error)
        }       
        else
        {
            let imgArray = files.map((file) =>{
                let img = fs.readFileSync(file.path);
                return encode_image = img.toString('base64')
            })
            imgArray.map((src,index) =>
            {  
                let product = new Product({
                    name: name,
                    desc: desc,
                    price: price,
                    categoryid: categoryid,
                    subcategoryid: subcategoryid, 
                    imgPath : {
                        filename : files[index].originalname,
                        contentType : files[index].mimetype,
                        imageBase64 : src
                    }
                });

                product.save((err, newProduct) => {
                    if (err) 
                    { 
                        req.session.message = {
                            type: 'danger',
                            intro: 'Could Not Add Product',
                            message: 'Please Try Again.'
                        }
                        res.redirect('/admin/addnewProduct')
                    } 
                    else
                    {   
                        req.session.message = {
                            type: 'success',
                            intro: 'Successfully Added',
                            message: ''
                        }                     
                        res.redirect('/admin/addnewProduct');
                    }
                });                   
            });          
        }          
    }
    catch(error)
    {
        console.error(error);
       // res.status(500).json({ message: "Server Error" });
       res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
//0 báo lỗi khi k có img
exports.uploadImages = async (req, res, next) => {
    try
    {   
        const productId = await Product.findOne({_id:req.params.id}).lean();
        const files = req.files; //access the files property using req object and store in the const files
       // const {name, desc, price, categoryid, subcategoryid} = req.body
        if(!productId || productId == [] || productId == null || productId == undefined)
        {
            req.session.message = {
                type: 'danger',
                intro: 'Could Not Find Product ID',
                message: 'Please Try Again.'
            }
            res.redirect('/admin/edit/' + req.params.id)
        }
        if(!files || files == [] || files == null || files == undefined)
        { 
           /*  const error = new Error('Please Choose Images');
            error.httpStatusCode = 400;
            return next(error); */
            req.session.message = {
                type: 'warning',
                intro: 'Dont have any pictures',
                message: 'Please Try Again.'
            }
            res.redirect('/admin/edit/' + req.params.id)
        }
        const allImages = await UploadImage.find({productid: productId}).count().lean();
        if(allImages >= 4)
        {
            req.session.message = {
                type: 'warning',
                intro: 'You can store 4 pictures',
                message: 'Please delete to add more'
            }
            res.redirect('/admin/edit/' + req.params.id)
        }
        //convert images into base64 encoding
        //iterate over the array of images
        else
        {            
            let imgArray = files.map((file) =>{
            // store buffer data by using readFileSync() and convert into base64
            let img = fs.readFileSync(file.path);
            // imgArray will return an array of base64
            return encode_image = img.toString('base64')})
        //to iterate over the error as well as the promise
            imgArray.map((src,index) =>
            {
                //create object to store data in the collection
                let finalImg = 
                {
                    filename : files[index].originalname,
                    contentType : files[index].mimetype,                    
                    imageBase64 : src,
                    productid : productId
                }         
                //call map() to iterate over array
                let newUpload = new UploadImage(finalImg);
                if (!newUpload) 
                { 
                    req.session.message =
                    {
                        type: 'danger',
                        intro: 'Choose Image To Upload',
                        message: 'Please Try Again.'
                    }
                    res.redirect('/admin/edit/' + req.params.id)
                } 
                else
                {   
                    newUpload.save();

                    req.session.message =
                    {
                        type: 'success',
                        intro: 'Successfully Added',
                        message: ''
                    }                     
                        res.redirect('/admin/edit/' + req.params.id)
                }
            });                       
        };       
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.editProduct = async (req, res) => {
    try
    {   
        var categories =await Category.find({}).populate('subcategory').lean();
        const productImg = await Product.find({_id: req.params.id}).lean();          
        const imagesFull = await UploadImage.find({_id: req.params.id}).lean();

        const newProduct = await Product.findOne({_id: req.params.id}).lean();
        const all_images = await UploadImage.find({productid: newProduct}).lean();   
        res.render('admin/editProduct', {layout: 'admin.handlebars', newProduct, all_images,productImg, imagesFull,categories});
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.updatedProduct = async (req, res) => {
    try
    {     
        const {name, desc, price} = req.body;
        if(!name || !desc || !price)
        {
            req.session.message = {
                type: 'danger',
                intro: 'Something Wrong.',
                message: 'Please Try Again'
            }   
            res.render('admin/editProduct', {layout: 'admin.handlebars'});
        }
        else
        {
            await Product.findOneAndUpdate({_id: req.params.id}, {name, desc, price});
            req.session.message = {
                type: 'success',
                intro: 'Successfully Updated',
                message: ''
            } 
            res.redirect('/admin/edit/' + req.params.id)
        }                   
    }
    catch(error)
    {
        console.error(error);
       // res.status(500).json({ message: "Server Error" });
       res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.deleteImg = async (req, res) => {
    try
    {
        await Product.updateOne({ _id:req.params.id },
            { $unset: { img: "", imgPath: "" } }
        )        
        res.redirect('/admin/edit/' + req.params.id);        
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.deleteProImg = async (req, res) => {
    try
    {
        await UploadImage.findOneAndRemove({_id:req.params.id}).lean();
        backURL=req.header('Referer') || '/admin';        
        res.redirect(backURL);
    
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};

exports.viewOrderDetails = async (req, res) => {
    try
    {   
        var categories =await Category.find({}).populate('subcategory').lean();

        const orderdetails = await Order.findOne({_id : req.params.id}).populate('user').lean();
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
        res.render('admin/viewOrderDetail', {layout: 'admin.handlebars',orderdetails:orderdetails,categories});
    }
    catch(error)
    {
        console.error(error);
        // res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.deleteUser = async (req, res) => {
    try
    {   
        await User.findOneAndRemove({_id:req.params.id}).lean();
        backURL=req.header('Referer') || '/admin';        
        res.redirect(backURL);
    }
    catch(error)
    {
        console.error(error);
       // res.status(500).json({ message: "Server Error" });
       res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.deleteOrder = async (req, res) => {
    try
    {   
        await Order.findOneAndRemove({_id:req.params.id}).lean();
        backURL=req.header('Referer') || '/admin';        
        res.redirect(backURL);
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
exports.gettoMessage = async (req, res) => {
    try
    {           
       var categories =await Category.find({}).populate('subcategory').lean();
       var getMessage = await Message.find({}).lean();
      
        res.render('admin/message', {layout: 'admin.handlebars',getMessage,categories})
    }
    catch(error)
    {
        console.error(error);
        //res.status(500).json({ message: "Server Error" });
        res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
    }
};
