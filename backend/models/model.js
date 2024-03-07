const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Please add model name and generation"],
        maxlength: 100
    },

    engines: [{
        type: String,
    }],

}, {timestamps: true});

module.exports = mongoose.model("Model", modelSchema);