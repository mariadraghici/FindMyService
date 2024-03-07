const Car = require('../models/car');
const ErrorResponse = require('../utils/errorResponse');


exports.createCar = async(req, res, next) => {

    try {
       const car = await Car.create(req.body);
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