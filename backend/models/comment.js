const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: [true, "Vă rugăm să adăugați un comentariu"],
        maxlength: 1000
    },
    auction: {
        type: ObjectId,
        ref: "Auction"
    },

    price : {
        type: Number,
        required: [true, "Vă rugăm să adăugați un preț"],
    }
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);