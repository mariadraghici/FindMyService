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
    const usernameExist = await User.findOne({name: req.body.name});

    if (userExist) {
        return next(new ErrorResponse(`Utilizator deja existent cu adresa de email ${email}`, 400));
    }

    if (usernameExist) {
        return next(new ErrorResponse(`Acest ume de utilizator deja există!`, 400));
    }

    if (!req.body.password.match(regex)) {
        return next(new ErrorResponse(`Parola trebuie să conțină cel puțin 8 caractere, o literă mare, o literă mică, un număr și un caracter special!`, 400));
    }

    try {

        const {role} = req.body;
        let user;

        const latestUser = await User.findOne().sort({ socketNumber: -1 });

        if (latestUser) {
            socketNumber = latestUser.socketNumber + 1;
          } else {
            socketNumber = 1;
          }

        if (role === 2) {
            const {lat, lng, address, name, email, password, role, phone, city} = req.body;
            const addressRecord = await Address.create({lat, lng, address})

            user = await User.create({name, email, password, role, phone, city, address: addressRecord._id, socketNumber});
        } else {
            const {name, email, password, role} = req.body;
            user = await User.create({name, email, password, role, socketNumber});
        }

        const token = await Token.create({ token: crypto.randomBytes(16).toString('hex'),
        username: req.body.name,
        expiresAt: Date.now() + 86400000,
        userId: user._id
        });

        const msg = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'FindMy Service Account Activation Link',
            text: `http://${req.headers.host}/api/verifyEmail?token=${token.token}`,
            html: ` <h1 style="color: #e6004; font-size: 48px; text-align: center; margin-top: 20px;">
                        Click the link below to activate your account
                    </h1>
                    <div style="text-align: center;">
                        <a href="http://${req.headers.host}/api/verifyEmail?token=${token.token}"
                        style="font-size: 20px; color: #ffffff; background-color: #e60049; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Activate Account
                        </a>
                    </div>`
        };

        await sgMail.send(msg);

        res.status(201).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.verifyEmail = async(req, res, next) => {
    try {
        const token = await Token.findOne({ token: req.query.token });
        // if (!token) {
        //     return next(new ErrorResponse(`Contactați-ne pentru ajutor.`, 400));
        // }

        const user = await User.findById(token.userId);
        // if (!user) {
        //     return next(new ErrorResponse(`User not found!`, 404));
        // }

        user.verified = true;
        await user.save();

        await token.deleteOne({ token});

        res.redirect('http://localhost:3000/account-verified');
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
        return next(new ErrorResponse(`Nu poți să te deconectezi momentan!`, 400));
    }

    jwt.verify(cookie.access_token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err && err.name !== 'TokenExpiredError') {
            return next(new ErrorResponse(`Token invalid!`, 400));
        }
        
        const user = jwt.verify(cookie.access_token, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
        try {
            const token = await Token.findOne({ username: user.name});
            const logout = await token.deleteOne({ token: token.token });

            if (!token || !logout) {
                return next(new ErrorResponse(`Nu poți să te deconectezi momentan!`, 400));
            }

        } catch (error) {
            return next(new ErrorResponse(`Nu poți să te deconectezi momentan!`, 400));
        }

        res.clearCookie('access_token', { httpOnly: true, sameSite: 'None', secure: true})
        .status(200)
        .json({message: 'Deconectare reușită!'});
    });
};

exports.userProfile = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id).populate('city').populate('address');
        
        
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
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

exports.sendResetPasswordEmail = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        const token = await Token.create({ token: crypto.randomBytes(16).toString('hex'),
        username: user.name,
        expiresAt: Date.now() + 86400000,
        userId: user._id
        });

        const msg = {
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: 'FindMy Service Reset Password Link',
            text: `http://${req.headers.host}/api/resetPassword?token=${token.token}`,
            html: ` <h1 style="color: #e6004; font-size: 48px; text-align: center; margin-top: 20px;">
                        Click the link below to reset your password
                    </h1>
                    <div style="text-align: center;">
                        <a href="http://${req.headers.host}/api/resetPassword?token=${token.token}"
                        style="font-size: 20px; color: #ffffff; background-color: #e60049; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                            Reset Password
                        </a>
                    </div>`
        };

        await sgMail.send(msg);

        res.status(200).json({
            success: true,
            message: 'Email-ul de resetare a parolei a fost trimis cu succes!'
        });
    } catch (error) {
        next(error);
    }
}

exports.updatePassword = async(req, res, next) => {
    try {
        const token = await Token.findOne({ token: req.body.token });

        if (!token) {
            return next(new ErrorResponse(`Contactează-ne pentru ajutor.`, 400));
        }

        const user = await User.findById(token.userId);

        if (!user) {
            return next(new ErrorResponse(`User not found!`, 404));
        }

        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            return next(new ErrorResponse(`Ambele câmpuri sunt obligatorii!`, 400));
        }

        if (password !== confirmPassword) {
            return next(new ErrorResponse(`Parolele nu sunt identice!`, 400));
        }

       user.password = password;

        await user.save();
        await token.deleteOne({ token });

        res.status(200).json({
            success: true,
            message: 'Parola a fost resetată cu succes!'
        });
    } catch (error) {
        next(error);
    }
}

exports.resetPassword = async(req, res, next) => {
    try {

        console.log(req.query.token);
        const token = await Token.findOne({ token: req.query.token });

        console.log(token);

        if (!token || !token.expiresAt > Date.now()) {
            return next(new ErrorResponse(`Contactează-ne pentru ajutor.`, 400));
        }

        res.redirect(`http://localhost:3000/updatepassword?token=${req.query.token}`);

    } catch (error) {
        next(error);
    }
}


