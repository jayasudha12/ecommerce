const express = require('express');
const router = express.Router();
const usercontroller =  require('../controller/UserController')

router.post('/signup',usercontroller.register);
router.post('/login',usercontroller.login);

module.exports = router;