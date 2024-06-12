const mongoose = require('mongoose');
const image = require('./image');
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        maxlength: 100
    },

    description: {
        type: String,
        required: [true, "Please add a description"],
        maxlength: 1000
    },

    user: {
        type: ObjectId,
        ref: "User"
    },

    images: [{
        type: ObjectId,
        ref: "Image"
    }],

    comments: [{
        type: ObjectId,
        ref: "Comment"
    }]
    
}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);