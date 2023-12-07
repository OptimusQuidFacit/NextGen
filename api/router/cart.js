const express= require('express');
const router= express.Router();
const {createCart, updateCart, getCart}= require('../controllers/cart');
const { verifyTokenAndAuthorization } = require('./auth');

router.post('/:id', createCart);
router.put('/:id', verifyTokenAndAuthorization, updateCart);
router.get('/:id', verifyTokenAndAuthorization, getCart);

module.exports=router;

