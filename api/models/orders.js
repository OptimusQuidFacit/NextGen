const mongoose= require('mongoose');

const ordersSchema = new mongoose.Schema({
    UserId: {type: String, required:true, unique:true},
    Products: {type: Array, required:true},
    Total: {type: Number, required:true},
    Paystack_Ref:{type: String},
    PaymentVerified:{type: Boolean}
});

module.exports= mongoose.model("orders", ordersSchema);