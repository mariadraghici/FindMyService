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
    ]

}, {timestamps: true});

// encrypt password before saving to database
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    // next();
});

// compare password
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// generate token
userSchema.methods.jwtGenerateToken = async function(next) {
    return await jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

module.exports = mongoose.model("User", userSchema);
