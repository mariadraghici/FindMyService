const User = require('../models/user');
const Car = require('../models/car');
const ErrorResponse = require('../utils/errorResponse');

exports.userCars = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('cars');

        return res.status(200).json({
            success: true,
            cars: user.cars
        });
    } catch (error) {
        return next(new ErrorResponse('Error fetching user cars', 400));
    }
};

exports.addImage = async (req, res, next) => {

    try {
        const image = await Image.create(req.body);

        const user = await User.findById(req.user._id);

        user.images.push(image._id);

        await user.save();

        return res.status(201).json({
            success: true,
            image
        });
    } catch (error) {
        return next(new ErrorResponse('Error adding image', 400));
    }
}

exports.editDescription = async (req, res, next) => {
    const { id, description } = req.body;

    try {
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
    } catch (error) {
        return next(new ErrorResponse('Error editing description', 400));
    }
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