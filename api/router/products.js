const express= require('express');
const router= express.Router();
const { verifyTokenAndAuthorization } = require('./auth');
const { createProduct } = require('../controllers/products');

router.post("/newproduct/:id", verifyTokenAndAuthorization, createProduct);

module.exports=router;

