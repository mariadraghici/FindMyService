const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Nume necesar!"],
        maxlength: 32
    },

    lat: {
        type: Number,
        required: [true, "Latitudinea este necesară!"]
    },

    lng: {
        type: Number,
        required: [true, "Longitudinea este necesară!"]
    },

    judet: {
        type: String,
        required: [true, "Judetul este necesar!"]
    }
}, {timestamps: true});

module.exports = mongoose.model("City", CitySchema);