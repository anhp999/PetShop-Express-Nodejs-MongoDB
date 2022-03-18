const mongoose = require('mongoose');

const Category2Schema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, "Please enter the title"]
    },
    description:{
        type: String, 
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    }
});



module.exports = mongoose.model('category2', Category2Schema);