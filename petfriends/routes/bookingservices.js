const express = require("express");
const router = express.Router();
const { setBooking,getBooking} = require('../controllers/serviceController');

router.get('/', getBooking);
router.post('/services', setBooking);




module.exports = router;
