const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Please add car name"],
        maxlength: 32
    },

    brand: {
        type: ObjectId,
        ref: "Brand",
        required: [true, "Please select a category"]
    },

    model: {
        type: String,
        trim: true, // removes whitespace before and after text
        //required: [true, "Please add car model"],
        ref: "Model",
        maxlength: 100
    },

    engine: {
        type: String,
        trim: true, // removes whitespace before and after text
        maxlength: 100
    },

    year: {
        type: Number,
        trim: true, // removes whitespace before and after text
        maxlength: 4
    },

    km: {
        type: Number,
        trim: true, // removes whitespace before and after text
        maxlength: 32
    },

    transmission: {
        type: String,
        trim: true, // removes whitespace before and after text
        maxlength: 32
    },

    fuel: {
        type: String,
        trim: true, // removes whitespace before and after text
        maxlength: 32
    },

    traction: {
        type: String,
        trim: true, // removes whitespace before and after text
        maxlength: 32
    },

}, {timestamps: true});

module.exports = mongoose.model("Car", carSchema);
