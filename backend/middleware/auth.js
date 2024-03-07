const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

// Check if user is logged in
exports.isAuthenicated = async (req, res, next) => {
    const {token} = req.cookies;
    
    if (!token) {
        return next(new ErrorResponse(`You need to loginnnn first!`, 401));
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        console.log(error);
        return next(new ErrorResponse(`You need to login first!`, 401));
    }
};