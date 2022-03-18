const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, "Please enter the title"]
    },
    description:{
        type: String, 
        required: false
    },
    subcategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category2'
    }]
});



module.exports = mongoose.model('category', CategorySchema);