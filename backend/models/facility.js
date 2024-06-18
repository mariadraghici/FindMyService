const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true, "Numele facilității este necesar!"],
        maxlength: 200
    },

}, {timestamps: true});

module.exports = mongoose.model("Facility", facilitySchema);