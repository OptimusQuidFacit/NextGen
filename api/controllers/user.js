
const userModel = require("../models/user")
const CryptoJs= require('crypto-js');
const jwt= require("jsonwebtoken");
const dotenv= require('dotenv');
const { Password } = require("@mui/icons-material");
const uuid= require('uuid')
const transporter=require('./email');
const { baseUrl } = require("./globals");
dotenv.config();
// console.log(baseUrl)

const createUser= async(user, req, res)=>{

    const newUser = new userModel(user)
    try{

        const user = await newUser.save();
        res.json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
}

const signUp= async(req, res)=>{
    const {Email, Password} = req.body;
    const encrypted= CryptoJs.AES.encrypt(Password, process.env.PASS_SEC).toString();
    let user = {
        ...req.body, isAdmin:false, Password:encrypted,  verificationToken:uuid.v4()
    }
    const mailOptions = {
        from: 'chimkaemewiseman@gmail.com', // sender address
        to: Email, // list of receivers
        subject: 'Email Verification', // Subject line
        text: `Click the following link to verify your email: ${baseUrl}/users/verify/${user.verificationToken}`
      };

      transporter.sendMail(mailOptions, (error, info)=>{
        if(error)console.log(error)
        else{
        console.log(info)
        }
      })


    createUser(user, req, res);

}
const verifyEmail = async(req, res)=>{
    const user= await userModel.findOne({verificationToken: req.params.id})
    if (user) {
       const updated= await userModel.updateOne(user,{$set:{
            isVerified:true
        }})
        res.json({msg:"Email succesfully verified",updated});
    }
    else{
        res.status(401).json("Email not recognized in our database")
    }
}

const signIn = async(req,res)=>{
    const user= await userModel.findOne({Email: req.body.Email})
    //res.json(user);
    if(user){
        const decrypted= CryptoJs.AES.decrypt(user.Password, process.env.PASS_SEC).toString(CryptoJs.enc.Utf8);

        if(decrypted==req.body.Password){
           let accessToken= jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SEC, {expiresIn:"3d"});
            updated= await userModel.findOneAndUpdate(user,{$set:{
                token: accessToken
            }},{new:true});
            res.json(updated)
        }
        else{
            res.status(500).json("Wrong Password")
        }
    }
    else{
        res.status(500).json("You are not registered");
    }
}

const getUser = async(req, res)=>{
    const id= req.params.id;
    let user = await userModel.findOne({_id:id});
    res.json(user);
}

const updateUser= async (req, res)=>{
    const id = req.params.id
    const update= req.body
    let updatedUser= await userModel.findOneAndUpdate({_id:id}, {$set:{update}});
    res.json(updatedUser);
}

const deleteUser=  async (req, res)=>{
    const id = req.params.id
    const update= req.body
    let deleted= await userModel.deleteOne({_id:id});
    res.json(deleted);
}

module.exports= {signUp, signIn, getUser, updateUser, deleteUser, verifyEmail}