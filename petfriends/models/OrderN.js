const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usersn'
    },
    cart:{
        type:Object,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    phone: { 
        type: Number,
        required:false,
    },
    dateOfOrder:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('OrderN', orderSchema);