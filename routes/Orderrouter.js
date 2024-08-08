const express = require('express');
const router = express.Router();
const ordercontroller = require('../controller/OrderController');


router.post('/addorder',ordercontroller.createOrder);
router.get('/getorder',ordercontroller.getorder);


module.exports = router;