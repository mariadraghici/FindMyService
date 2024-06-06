const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "City name is required"],
        maxlength: 32
    },

    lat: {
        type: Number,
        required: [true, "Latitude is required"]
    },

    lng: {
        type: Number,
        required: [true, "Longitude is required"]
    },

    judet: {
        type: String,
        required: [true, "Judet is required"]
    }
}, {timestamps: true});

module.exports = mongoose.model("City", CitySchema);