const User = require('../models/user');
const Car = require('../models/car');
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

exports.editDescription = async (req, res, next) => {
    const { id, description } = req.body;

    const car = await Car.findById(id);

    if (!car) {
        return next(new ErrorResponse('Car not found', 404));
    }

    car.description = description;

    await car.save();

    return res.status(200).json({
        success: true,
        description: car.description
    });
};

exports.editKm = async (req, res, next) => {
    const { id, km } = req.body;
    console.log(req.body);

    try {
        const car = await Car.findById(id);

        if (!car) {
            return next(new ErrorResponse('Car not found', 404));
        }

        car.km = km;

        await car.save();

        return res.status(200).json({
            success: true,
            km: car.km
        });
    } catch (error) {
        return next(new ErrorResponse('Error editing km', 400));
    }
};