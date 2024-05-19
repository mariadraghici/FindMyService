const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    userFrom: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    userTo: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    // priceRating: {
    //     type: Number,
    //     required: true
    // },

    // facilitiesRating: {
    //     type: Number,
    //     required: true
    // },

    // promptitudeRating: {
    //     type: Number,
    //     required: true
    // },

    rating: {
        type: Number,
        required: true
    },
    reviewText: {
        type: String,
    },
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

    title: {
        type: String,
        required: true
    },

    car: {
        type: ObjectId,
        ref: 'Car',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);