const express = require("express");
const router = express.Router();
var csrf = require('csurf');
const { getProductForIndexPage} = require('../controllers/dogController');


router.get('/', getProductForIndexPage);




module.exports = router;
