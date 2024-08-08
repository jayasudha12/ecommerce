const express = require('express');
const router = express.Router();
const productcontroller = require('../controller/ProductController')

router.get('/products',productcontroller.getallproducts);
router.post('/addproduct',productcontroller.addproduct);
router.patch('/editproduct/:id',productcontroller.editproduct);
router.delete('/deleteproduct/:id',productcontroller.deleteproduct);

module.exports = router;