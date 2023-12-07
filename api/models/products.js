const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    Name: {type: String, required:true},
    img: {type: String, required:true},
    Brand: {type: String, required:true},
    Category: {type: String, required:true},
    RAM: {type: String, required:true},
    ROM: {type: String, required:true},
    Processor: {type: String, required:true},
    Screen: {type: String, required:true},
    VRAM: {type: String, required:true},
    Price: {type: String, required:true},
    Condition :{type: String, required:true}
  

}, {
    timestamps:true
});

module.exports= mongoose.model("products", productSchema);