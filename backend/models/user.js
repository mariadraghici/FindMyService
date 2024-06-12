const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const address = require('./address');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // removes whitespace before and after text
        required: [true, "Name is required"],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    
    role: {
        type: Number,
        default: 0,
    },

    cars: [
        {
            type: ObjectId,
            ref: "Car"
        }
    ],

    facilities: [
        {
            type: ObjectId,
            ref: "ServiceFacility"
        }
    ],

    city: {
        type: ObjectId,
        ref: "City"
    },

    address: {
        type: String,
        trim: true,
        maxlength: 200
    },

    phone: {
        type: String,
        trim: true,
        maxlength: 15
    },

    rating: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            type: ObjectId,
            ref: "Review"
        }
    ],

    description: {
        type: String,
        trim: true,
        maxlength: 2000
    },

    verified: {
        type: Boolean,
        default: false
    },

    images: [
        {
            type: ObjectId,
            ref: "Image"
        }
    ],

    schedule: {
        type: String,
    },

    address: {
        type: ObjectId,
        ref: "Address",
    },

    socketNumber: {
        type: Number,
        required: true
    },

    newOffers: [
        {
            type: ObjectId,
            ref: "Offer"
        }
    ],

    auctions: [
        {
            type: ObjectId,
            ref: "Auction"
        }
    ],

}, {timestamps: true});

// encrypt password before saving to database
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});

// // compare password
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
