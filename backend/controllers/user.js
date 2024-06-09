const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


// User profile
exports.userCars = async (req, res, next) => {

    const user = await User.findById(req.user._id).populate('cars');

    return res.status(200).json({
        success: true,
        cars: user.cars
    });
};

exports.addImage = async (req, res, next) => {
    const image = await Image.create(req.body);

    const user = await User.findById(req.user._id);

    user.images.push(image._id);

    await user.save();

    return res.status(201).json({
        success: true,
        image
    });
}