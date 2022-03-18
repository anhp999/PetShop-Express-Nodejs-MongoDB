const mongoose = require('mongoose')
const Schema = mongoose.Schema

//tao model
const imgSchema = new Schema({
    filename:
    {
        type: String,
        unique: true,
        require: true
    },
    contentType : {
        type: String,
        required : true
    },   
    imageBase64:
    {
        type: String,
        require: true
    },
    productid: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dog'
    }]
    
});
//postSchema sẽ tạo ra 1 collection
module.exports = mongoose.model('img', imgSchema)