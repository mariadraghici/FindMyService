const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Va rugam sa introduceti numele modelului și generația!"],
        maxlength: 100
    },

    brand: {
        type: ObjectId,
        ref: "Brand",
        required: true
    },

    engines: [{
        type: String,
    }],

}, {timestamps: true});

module.exports = mongoose.model("Model", modelSchema);