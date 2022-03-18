const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//tao model
const wishlistSchema = new Schema({
    title: {type: String, default: 'My Wish List'},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersn'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dog'
    },
    price: {
        type: Number,
        required: false
    }, 
    quantity: {
        type: Number,
        required: false
    }
});
//postSchema sẽ tạo ra 1 collection
module.exports = mongoose.model('wishlist', wishlistSchema);

