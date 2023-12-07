const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');


const verifyToken= (req, res, next)=>{
    const {token} = req.headers
    let authToken= token.split(' ')[1];
    if(authToken){

        jwt.verify(authToken, process.env.JWT_SEC, (err, data)=>{
            if(err) res.status(401).json('Invalid Token')
            else{
                req.user=data;
        }
        })
        next();
    }
    else{
        res.status(401).json('You are not authenticated');
    }
}
const verifyTokenAndAuthorization= (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(401).json("You are not allowed to do that");
        }
    })
}
const verifyTokenAndAdmin= (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(401).json("Only Admins are allowed to do this");
        }
    })
}
module.exports={verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization}