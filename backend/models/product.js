const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Please add a product name"],
        maxlength: 32
    },

    description: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Please add a product description"],
        maxlength: 2000
    },

    price: {
        type: Number,
        trim: true, // removes whitespace before and after text
        required: [true, "Please add a product price"],
        maxlength: 32
    },

    category: {
        type: ObjectId,
        ref: "Brand",
        required: [true, "Please select a category"]
    },

}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);
