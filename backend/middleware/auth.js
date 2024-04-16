const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


// Check if user is logged in
exports.isAuthenicated = async (req, res, next) => {
    const token = req.cookies.access_token;
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(new ErrorResponse("Access forbidden!", 403));
        }
        
        req.user = decoded;
        next();
    });
};