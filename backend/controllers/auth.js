const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async(req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        return next(new ErrorResponse(`User already exists with email of ${email}`, 400));
    }

    try {
        console.log("here is the request" + req);
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
        
        generateToken(user, 200, res);
    } catch(error) {
        console.log(error);
        next(new ErrorResponse(`Cannot log in, check credentials!`, 400));
    }
};

const generateToken = async (user, statusCode, res) => {
    const token = await user.jwtGenerateToken();

    const options = {
        expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000), // convert to milliseconds
        httpOnly: true
    };

   // if(process.env.NODE_ENV === "production") options.secure = true;

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token
    });
}

exports.logout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Signed out successfully!"
    });
};

// User profile
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
};

exports.singleUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(req);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }  
};