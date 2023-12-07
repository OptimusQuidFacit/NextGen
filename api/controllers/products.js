
const productsModel= require('../models/products')


const createProduct= async (req, res)=>{
const request = req.body;
    const product= new productsModel({
        ...request
    })
    try {
        const newProduct= await product.save();
    res.json(newProduct);
    }
    catch(err){
    console.log(err);
    }
    }

    const updateProduct= async (req, res)=>{

       try {
        
        let id = req.query.pid;
        let update = req.body;
        let updatedProduct = await productsModel.updateOne({_id:id}, update);
        res.json(updatedProduct)
    }
    catch(err){
        res.status(500).json(err);

    }

    }
    const deleteProduct = async (req, res)=>{
        let id = req.query.pid;
        try{
            let deleted = await productsModel.deleteOne({_id:id})
            res.json(deleted)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    const getProduct = async(req, res)=>{
        let id= req.query.pid;
        try {
            const product = await productsModel.find({_id:id});
            res.json(product);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    const getProducts = async(req, res)=>{
        try {
            const products = await productsModel.find({});
            res.json(products);
        }
        catch(err){
            res.status(500).json(err);
        }
    }

    module.exports={createProduct, updateProduct, deleteProduct, getProduct, getProducts}