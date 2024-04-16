const User = require('../models/user');
const Token = require('../models/token');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

exports.signup = async(req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        return next(new ErrorResponse(`User already exists with email of ${email}`, 400));
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.signin = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new ErrorResponse(`Email and Password are required!`, 400));
        }

        // check if user exists
        const user = await User.findOne({email});


        if(!user) {
            return next(new ErrorResponse(`User not found with email of ${email}`, 404));
        }
        
        // check if password matches
        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return next(new ErrorResponse(`Invalid credentials!`, 404));
        }
        
        const accessToken = jwt.sign({ "_id": user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
        // const refreshToken = jwt.sign({ "_id": user._id }, process.env.RFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        
        // const token = await Token.create({ token: refreshToken, username: user.name});

        // if (!token) {
        //     return next(new ErrorResponse(`Cannot create token!`, 400));
        // }

        // const role = user.role;
        res
        .status(200)
        .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
          })
        .send("Logged in successfully!");
    } catch(error) {
        console.log(error);
        next(new ErrorResponse(`Cannot log in, check credentials!`, 400));
    }
};

exports.refreshToken = async (req, res, next) => {
        const cookie = req.cookies;

        if (!cookie?.jwt) {
            return res.status(401).send('Access Denied. No token provided.');
        }
        
        console.log(cookie.jwt);

        const refreshToken = cookie.jwt;
        // check if user exists
        const token = await Token.findOne({ token: refreshToken });

        if(!token) {
            return res.status(403).send('Invalid User.');
        }


        jwt.verify(refreshToken, process.env.RFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err || token._userId.toString() !== decoded._id) {
                return res.status(403).send('Invalid Token.');
            }
            
            const role = decoded.role;
            const accessToken = jwt.sign({ "_id": decoded._id, "role": role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
            res
            .status(200)
            .json({role, accessToken});
        });
};


exports.logout = async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.access_token) {
        res.status(200).send('Not logged in!');
        return;
    }

    // const refreshToken = cookie.jwt;


    // const token = await Token.findOne({ token: refreshToken });

    // if (!token) {
    //     return res.clearCookie('access_token', { httpOnly: true, sameSite: 'None', secure: true}).status(204);
    // }

    // // Delete refresh token
    // await token.deleteOne({ token: refreshToken });

    res.clearCookie('access_token', { httpOnly: true, sameSite: 'None', secure: true})
    .status(200)
    .send('Logged out successfully!');
};

// User profile
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user._id);

    console.log(req);

    res.status(200).json({
        success: true,
        user
    });
};

exports.singleUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }  
};