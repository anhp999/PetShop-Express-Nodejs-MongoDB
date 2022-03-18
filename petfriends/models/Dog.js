const mongoose = require('mongoose')
const Schema = mongoose.Schema

//tao model
const dogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
        //required: false
    },
    subcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories2'
    },
    categoryid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price']
        //required: false
    },    
    img: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: [true, "Please enter a description"]
        //required: false
    }, 
    imgPath:{
        filename:
        {
            type: String,
            unique: true,
            require: false
        },
        contentType : 
        {
            type: String,
            required : false
        },
        imageBase64:
        {
            type: String,
            require: false
        }
    },
    countInStock: {
        type: Number,
        required: false,
    }
});
//postSchema sẽ tạo ra 1 collection
module.exports = mongoose.model('dog', dogSchema)