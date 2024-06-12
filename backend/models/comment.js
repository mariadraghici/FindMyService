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
    auction: {
        type: ObjectId,
        ref: "Auction"
    },

    price : {
        type: Number,
        required: [true, "Please add a price"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);