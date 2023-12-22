const ordersModel= require('../models/orders')
const userModel = require("../models/user");
const paystack = require('paystack-api')(process.env.PAYSTACK_SEC);


const createOrders= async (req, res)=>{
const request = req.body;
    const orders= new ordersModel({
        ...request
    });
    try {
        let ordersExists= await ordersModel.findOne({UserId:req.params.id})
        if(ordersExists) res.json('orders Already exists');
        
        else{
        const newOrders = await orders.save();
        res.json(newOrders);
    }
         
    }
    catch(err){
        console.log(err);
    }
    
    }

    const getOrders= async(req, res)=>{
        try{
            const orders= await ordersModel.findOne({UserId: req.params.id})
            res.json(orders);
        }
        catch(err){
            console.log(err);
        }
    }
    const updateOrders= async(req, res)=>{
        const request= req.body;
        try{
            const updated = await ordersModel.findOneAndUpdate({UserId: req.params.id},{$set:{
                ...request
            }});
            res.json(updated);
        }
        catch(err){
            console.log(err);
        }
    }

    const initializePayment= async (req, res)=>{
        const userId= req.params.id
        const user = await userModel.findOne({_id:userId})
        const order= await ordersModel.findOne({UserId:userId});
        const payment= await paystack.transaction.initialize({
            email: user.Email,
            amount: order.Total*100
        })
        await ordersModel.findOneAndUpdate({UserId:userId}, {Paystack_Ref:payment.data.reference})
        res.json(payment.data)

    }
    const verifyPayment = async (req, res)=>{
        let userId = req.params.id;
        const order = await ordersModel.findOne({UserId:userId})
        const verify= await paystack.transaction.verify({
            reference: order.Paystack_Ref
        })
        if(verify.data.status=='success'){
           await ordersModel.findOneAndUpdate({UserId:userId}, {PaymentVerified:true})

        }
        else{
            ordersModel.findOneAndUpdate({UserId:userId}, {PaymentVerified:false})
            
        }
        res.json(verify.data.status);

    }

    module.exports={createOrders, getOrders, updateOrders, initializePayment, verifyPayment}