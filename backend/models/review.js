mongoose.require('mongoose');
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
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
    model: {
        type: ObjectId,
        ref: 'Model',
        required: true
    },

    brand: {
        type: ObjectId,
        ref: 'Brand',
        required: true
    },

    engine: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);