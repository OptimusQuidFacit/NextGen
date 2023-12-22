const express= require('express');
const { createOrders, getOrders, initializePayment, verifyPayment, updateOrders } = require('../controllers/orders');
const { verifyTokenAndAuthorization } = require('./auth');
const router= express.Router();

router.post('/:id', verifyTokenAndAuthorization, createOrders);
router.get('/:id', verifyTokenAndAuthorization, getOrders);
router.put('/:id', verifyTokenAndAuthorization, updateOrders);
router.post('/checkout/:id', verifyTokenAndAuthorization, initializePayment);
router.post('/checkout/verify/:id', verifyTokenAndAuthorization, verifyPayment);

module.exports = router;