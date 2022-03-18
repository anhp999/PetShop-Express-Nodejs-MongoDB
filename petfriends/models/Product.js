const mongoose = require('mongoose')
const Schema = mongoose.Schema

//tao model
const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
        //required: false
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }],
    price: {
        type: Number,
        required: [true, 'Please enter a price']
        //required: false
    },
    onSale: {
        type: Boolean,
        default: false,
        required: false
    },
    sale_price: {
        type: Number,
        default: 0.0,
        required: false
    },

    main_image: {
        type: String,
        required: false
    },
    images: [{
        type: String,
        required: false
    }],
    description: {
        type: String,
        required: [true, "Please enter a description"]
        //required: false
    },
    short_desc: {
        type: String,
        required: false
    }
});
//postSchema sẽ tạo ra 1 collection
module.exports = mongoose.model('product', postSchema)