const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const recommendationSchema = new mongoose.Schema({
    userFrom: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    serviceEmail: {
        type: String,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },

    content: {
        type: String,
        trim: true,
        required: [true, "Please add some text"],
        maxlength: 500
    },

    phone: {
        type: String,
        trim: true,
        match: [
            /^(\+)?([ 0-9]){10,14}$/,
            "Please fill a valid phone number"
        ]
    },
    
}, {timestamps: true});

module.exports = mongoose.model("Recommendation", recommendationSchema);