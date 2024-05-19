const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/token');
const ErrorResponse = require('../utils/errorResponse');


// Check if user is logged in
exports.isAuthenicated = async (req, res, next) => {
    const cookie = req.cookies;

        if (!cookie?.access_token) {
            return res.status(401).send('Access Denied. No token provided.');
        }

        const access_token = cookie.access_token;

        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err && err.name == 'TokenExpiredError') {
                const user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
                
                const refreshToken = await Token.findOne({ username: user.name});
                if (!refreshToken) {
                    return res.status(401).send('Invalid Token 1.');
                }

                jwt.verify(refreshToken.token, process.env.RFRESH_TOKEN_SECRET, async (err, decoded) => {
                    if (err) {
                        return res.status(401).send('Invalid Token 2.');
                    }
                    
                    // res.json(JSON.stringify(decoded));
                    const accessToken = jwt.sign({ "_id": decoded._id, "name": decoded.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
                    

                    req.user = decoded;
                    res
                    .cookie("access_token", accessToken, {
                        httpOnly: true,
                        secure: true,
                    })
                    next();
                });
            } else {
                req.user = decoded;
                next();
            }
            // res.json(JSON.stringify("hei"));
        });
};