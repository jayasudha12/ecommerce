const express = require('express');
const router = express.Router();
const cartcontroller = require('../controller/CartController');

router.post('/addtocart',cartcontroller.addtocart);
router.get('/getitem',cartcontroller.getitem);
router.delete('/deletecartproduct/:id',cartcontroller.deleteproduct);

module.exports = router;
