const City = require('../models/city');
const ErrorResponse = require('../utils/errorResponse');

exports.createCity = async (req, res, next) => {
    try {
        const city = await City.create(req.body);
        res.status(201).json({
        success: true,
        city,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
    };

exports.displayCities = async(req, res, next) => {
    try {
        const cities = await City.find();
        res.status(201).json({
            success: true,
            cities
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};