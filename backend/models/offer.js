const { text } = require('body-parser');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const offerSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, "Please add some text"],
        maxlength: 500
    },

    userFrom: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    userTo: {
        type: ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: Number,
        default: 0,
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Please add an email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
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

module.exports = mongoose.model("Offer", offerSchema);