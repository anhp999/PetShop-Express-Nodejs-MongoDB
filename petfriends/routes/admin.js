const express = require("express");
const router = express.Router();
const {CountAll, deleteProduct, editProduct, gettoAdd, 
  addnewProduct,uploadImages, viewOrderDetails,updatedProduct,deleteImg,deleteProImg, deleteUser,
  deleteOrder,
  getCate, gettoMessage} = require('../controllers/adminController');
const store = require('../middlewares/multer')



router.get('/',isAdmin, CountAll ) 
/* router.get('/:page?',isAdmin, paginate(Product), (req, res) => {
    console.log(res.paginatedResult);
    res.send(res.paginatedResult);
   // res.render('admin',{layout: 'admin.handlebars', pagination:res.paginatedResult});
}); */
router.get('/addnewProduct',isAdmin, gettoAdd)
router.get('/bookingServices',isAdmin, gettoMessage)
router.get('/adminCate/:id',isAdmin,getCate);
router.get('/edit/:id', isAdmin, editProduct)
router.get('/viewOrderDetail/:id', isAdmin, viewOrderDetails)
router.get('/filterRadio:filter?',isAdmin, CountAll)

router.post('/',store.array('images',1),isAdmin, addnewProduct)


//router.post('/',store.single('images'), addnewProduct)

//store.array('images',4)
//specify the storage and pass the array to it.
//the input type "name" in html is set "images", so pass "images" into the array.



router.put('/saved/:id',isAdmin , updatedProduct)
router.put('/uploadimg/:id',store.array('images',4),isAdmin, uploadImages)

router.delete('/:id', isAdmin, deleteProduct);
router.delete('/img/:id', isAdmin, deleteImg);
router.delete('/proimg/:id', isAdmin, deleteProImg);
router.delete('/deleteUser/:id', isAdmin, deleteUser);
router.delete('/deleteOrder/:id', isAdmin, deleteOrder);



//router.post('/adminCate',isAdmin,searchCate );


module.exports = router;
function isAdmin(req, res, next) {
    if (!req.isAuthenticated()|| !req.user) {
        return res.redirect('/');
    } else {
        if (req.user.role == 'admin') {
            return next();
        } else {
            return res.redirect('/');
        }
    }
}
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/usersn/signin');    
}
function paginate(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const result = {};
  
      if (endIndex < (await model.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      try {
        result.results = await model.find().limit(limit).skip(startIndex);
        res.paginatedResult = result;
        next();
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    };
  }