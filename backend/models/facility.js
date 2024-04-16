const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "Name is required"],
        maxlength: 200
    },

}, {timestamps: true});

module.exports = mongoose.model("Facility", facilitySchema);