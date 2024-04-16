const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        match: [
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ]
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
            ref: "Facility"
        }
    ],

    location: {
        type: ObjectId,
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
    ]

}, {timestamps: true});

// encrypt password before saving to database
userSchema.pre("save", async function(next) {
    if (this.isModified("password") && !/^\$2[aby]\$\d{2}\$/.test(this.password)) {
        // If the password is not already hashed, hash it
        this.password = await bcrypt.hash(this.password, 12);
    }

    if (this.role === 2 && !this.address) {
        return next(new Error("Address is required"));
    }

    if (this.role === 2 && !this.phone) {
        return next(new Error("Phone is required"));
    }
    // Proceed to the next middleware
    next();
});

// compare password
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    return bcrypt.compare(candidatePassword, this.password);
};

// // generate token
// userSchema.methods.jwtGenerateToken = async function(next) {
//     return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     });
// };

module.exports = mongoose.model("User", userSchema);
