const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ServiceFacilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    facilityId: {
        type: ObjectId,
        ref: "Facility",
        required: true,
    },

    priceLow: {
        type: Number,
    },

    priceHigh: {
        type: Number,
    },

    serviceId: {
        type: ObjectId,
        ref: "Service",
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("ServiceFacility", ServiceFacilitySchema);