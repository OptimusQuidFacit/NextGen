const cartModel= require('../models/cart')

const createCart= async (req, res)=>{
const request = req.body;
    const cart= new cartModel({
        ...request
    });
    try {
        let cartExists= await cartModel.findOne({UserId:req.params.id})
        if(cartExists) res.json('Cart Already exists'); 
        else{
        const newCart= await cart.save();
        res.json(newCart);
    }    
    }
    catch(err){
        console.log(err);
    }
    
    }

    const updateCart= async (req, res)=>{
        try{
            let userId=req.params.id
           const updatedCart= await cartModel.findOneAndUpdate({UserId: userId}, req.body)
           res.json(updatedCart)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    const getCart= async (req, res)=>{
        try{
            let userId= req.params.id;
            const userCart= await cartModel.findOne({UserId:userId});
            res.json(userCart);
        }
        catch (err){
            res.status(500).json(err);
        }
    }
module.exports={createCart, updateCart, getCart}