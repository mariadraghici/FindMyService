const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Nume masina necesar!"],
        maxlength: 32
    },

    brand: {
        type: ObjectId,
        ref: "Brand",
        required: [true, "Vă rugăm să selectați o marcă de mașină"]
    },

    brandName: {
        type: String,
        trim: true,
        maxlength: 32
    },

    modelName: {
        type: String,
        trim: true,
        maxlength: 32
    },

    model: {
        type: ObjectId,
        trim: true,
        required: [true, "Vă rugăm să selectați un model de mașină"],
        ref: "Model",
        maxlength: 100
    },

    engine: {
        type: String,
        required: [true, "Vă rugăm să selectați un tip de motorizare"],
        trim: true,
        maxlength: 100
    },

    year: {
        type: Number,
        trim: true,
        maxlength: 4
    },

    km: {
        type: Number,
        trim: true,
        maxlength: 32
    },

    transmission: {
        type: String,
        trim: true,
        maxlength: 32
    },

    fuel: {
        type: String,
        trim: true,
        maxlength: 32
    },

    traction: {
        type: String,
        trim: true,
        maxlength: 32
    },

    description: {
        type: String,
        trim: true,
        maxlength: 2000
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },

}, {timestamps: true});

module.exports = mongoose.model("Car", carSchema);
