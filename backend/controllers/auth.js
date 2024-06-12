const User = require('../models/user');
const Token = require('../models/token');
const Address = require('../models/address');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

exports.signup = async(req, res, next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        return next(new ErrorResponse(`User already exists with email of ${email}`, 400));
    }

    if (!req.body.password.match(regex)) {
        return next(new ErrorResponse(`Password must contain at least one uppercase letter, one lowercase letter, one number and one special character`, 400));
    }

    try {

        const {role} = req.body;
        let user;

        const latestUser = await User.findOne().sort({ socketNumber: -1 });

        if (latestUser) {
            socketNumber = latestUser.socketNumber + 1;
          } else {
            socketNumber = 1; // Starting number if no users exist
          }

        if (role === 2) {
            const {lat, lng, address, name, email, password, role, phone, city} = req.body;
            const addressRecord = await Address.create({lat, lng, address})

            user = await User.create({name, email, password, role, phone, city, address: addressRecord._id, socketNumber});
        } else {
            const {name, email, password, role} = req.body;
            user = await User.create({name, email, password, role, socketNumber});
        }

        // const token = await Token.create({ token: crypto.randomBytes(16).toString('hex'),
        // username: req.body.name,
        // expiresAt: Date.now() + 86400000,
        // userId: user._id
        // });

        // const msg = {
        //     from: process.env.SENDER_EMAIL,
        //     to: email,
        //     subject: 'FindMy Service Account Activation Link',
        //     text: `http://${req.headers.host}/api/verifyEmail?token=${token.token}`,
        //     html: `<h1>Click the link below to activate your account</h1>
        //      <a href=http://${req.headers.host}/api/verifyEmail?token=${token.token}>Activate Account</a>`
        // };

        // await sgMail.send(msg);

        res.status(201).json({
            success: true,
            message: 'Account created successfully! Check your email to activate your account.'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.verifyEmail = async(req, res, next) => {
    try {
        const token = await Token.findOne({ token: req.query.token });
        if (!token) {
            return next(new ErrorResponse(`Invalid token! Please contact us for support.`, 400));
        }

        const user = await User.findById(token.userId);
        if (!user) {
            return next(new ErrorResponse(`User not found!`, 404));
        }

        user.verified = true;
        await user.save();

        await token.deleteOne({ token});

        res.status(200).json({
            success: true,
            message: 'Account verified successfully!'
        });
    } catch (error) {
        next(error);
    }
};

        

exports.signin = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return next(new ErrorResponse(`Email and Password are required!`, 400));
        }

        const user = await User.findOne({email});


        if(!user) {
            return next(new ErrorResponse(`User not found with email of ${email}`, 404));
        }
        
        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return next(new ErrorResponse(`Invalid credentials!`, 404));
        }

        const initial_token = await Token.findOne({ username: user.name});

        if (initial_token) {
            await initial_token.deleteOne({ token: initial_token.token });
        }

        // if (!user.verified) {
        //     return next(new ErrorResponse(`Account not verified!`, 400));
        // }

        const accessToken = jwt.sign({ "_id": user._id, "name": user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
        const refreshToken = jwt.sign({ "_id": user._id, "name": user.name }, process.env.RFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        
        const token = await Token.create({ token: refreshToken, username: user.name, expiresAt: Date.now() + 86400000, userId: user._id});

        if (!token) {
            return next(new ErrorResponse(`Cannot create token!`, 400));
        }

        const role = user.role;
        res
        .status(200)
        .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
          })
        .json({"role": role});
    } catch(error) {
        console.log(error);
        next(new ErrorResponse(`Cannot log in, check credentials!`, 400));
    }
};

exports.logout = async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.access_token) {
        res.status(400).send('Not logged in!');
        return;
    }

    jwt.verify(cookie.access_token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err && err.name !== 'TokenExpiredError') {
            return res.status(401).send('Invalid Token.');
        }
        
        const user = jwt.verify(cookie.access_token, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
        try {
            const token = await Token.findOne({ username: user.name});
            const logout = await token.deleteOne({ token: token.token });

            if (!token || !logout) {
                return res.status(400).send('Cannot logout!');
            }

        } catch (error) {
            console.log(error);
            return res.status(400).send('Cannot logout!');
        }

        res.clearCookie('access_token', { httpOnly: true, sameSite: 'None', secure: true})
        .status(200)
        .send('Logged out successfully!');
    });
};

// User profile
exports.userProfile = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id).populate('city').populate('address');
        
        if (!user) {
            return next(new ErrorResponse(`User not found!`, 404));
        }
        
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        new ErrorResponse(`Cannot get user profile!`, 400);
    }
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
