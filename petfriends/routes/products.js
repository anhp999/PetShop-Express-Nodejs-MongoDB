const express = require('express');
const router = express.Router();
const {getProductsA, getProductById,getSubProductById, getProdetailById, getSortPrice} = require('../controllers/productController');
const Dog = require('../models/Dog');
//const moreResults = require('../middlewares/moreResults');

router.get('/', getProductsA)
router.get('/sortprice:sort?', getSortPrice)

router.get('/moreProducts/:id', getProductById)
router.get('/moreProducts/:id:sort?', getProductById)

router.get('/subCategory/:id', getSubProductById)
router.get('/subCategory/:id:sort?', getSubProductById)

router.get('/product-details/:id', getProdetailById)





module.exports = router;