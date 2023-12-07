const mongoose= require('mongoose');

const cartSchema = new mongoose.Schema({
    UserId: {type: String, required:true, unique:true},
    Products: {type: Array, required:true},
    Total: {type: Number, required:true},

});

module.exports= mongoose.model("cart", cartSchema);