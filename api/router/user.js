const express= require('express');
const { signUp, signIn, verifyEmail, updateUser } = require('../controllers/user');
const { verifyTokenAndAuthorization } = require('./auth');
const router= express.Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.get('/verify/:id', verifyEmail);
router.put('/update/:id', verifyTokenAndAuthorization, updateUser);

module.exports=router;

