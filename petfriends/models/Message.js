const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "Please enter the title"]
    },
    email:{
        type: String, 
        required: true
    },
    message:{
        type: String, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersn'
    }
});



module.exports = mongoose.model('messages', MessageSchema);