const Car = require('../models/car');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


exports.createCar = async(req, res, next) => {
    try {
        // const user = await User.findById(req.user);
        const car = await Car.create({ ...req.body, user: req.user._id });
        await User.findOneAndUpdate({ _id: req.user._id }, {$push: {cars: car._id}}, {includeResultMetadata: true});

        res.status(201).json({
            success: true,
            car
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.displayCar = async(req, res, next) => {

    try {
       const cars = await Car.find();
        res.status(201).json({
            success: true,
            cars
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.displayCarsByUserId = async(req, res, next) => {
    
        try {
            const user = await User.findById(req.user._id).populate('cars');
            const cars = user.cars;
            res.status(201).json({
                success: true,
                cars
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
};

exports.deleteCar = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {$pull: {cars: req.body.id}}, {new: true});
        const car = await Car.findByIdAndDelete(req.body.id);
        res.status(201).json({
            success: true,
            car,
            user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};