const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Location name is required"],
        maxlength: 32
    }
}, {timestamps: true});

module.exports = mongoose.model("Location", locationSchema);