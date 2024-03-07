const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Please add a brand name"],
        maxlength: 100
    },

    models: [{
        type: ObjectId,
        ref: "Models"
    }],
    
}, {timestamps: true});

module.exports = mongoose.model("Brand", brandSchema);
