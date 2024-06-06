const mongoose = require('mongoose')
const address = require('./address')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema



const addressSchema = new Schema({
    lat: {
        type: Number,
        required: true,
    },

    lng: {
        type: Number,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Address', addressSchema)