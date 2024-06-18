const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Vă rugăm să adăugați un titlu"],
        maxlength: 100
    },

    description: {
        type: String,
        required: [true, "Vă rugăm să adăugați o descriere"],
        maxlength: 10000
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
    }],
    
    model: {
        type: ObjectId,
        ref: 'Model',
        required: true
    },

    modelName: {
        type: String,
    },

    brand: {
        type: ObjectId,
        ref: 'Brand',
        required: true
    },

    brandName: {
        type: String
    },

    engine: {
        type: String,
        required: true
    },

    car: {
        type: ObjectId,
        ref: 'Car',
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },

    bestBid: {
        type: Number,
        default: 0
    },

    bestBidder: {
        type: ObjectId,
        ref: 'User'
    }
    
}, {timestamps: true});

module.exports = mongoose.model("Auction", auctionSchema);