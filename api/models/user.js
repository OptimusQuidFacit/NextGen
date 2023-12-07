const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    Name: {type: String, required:true, unique:true},
    Email: {type: String, required:true, unique:true},
    Phone: {type: String, required:true, unique:true},
    Password: {type: String, required:true},
    isAdmin: {type: Boolean, required:true},
    token: {type: String, unique:true},
    isVerified: {type: Boolean},
    verificationToken: {type: String, unique:true},
    UserImg: {type: String}

}, {timestamps: true});

module.exports= mongoose.model("user", userSchema);