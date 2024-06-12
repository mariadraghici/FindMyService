const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: [true, "Please add a comment"],
        maxlength: 1000
    },
    post: {
        type: ObjectId,
        ref: "Post"
    }
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);