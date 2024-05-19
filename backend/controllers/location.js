const Location = require('../models/location');
const ErrorResponse = require('../utils/errorResponse');

exports.createLocation = async (req, res, next) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json({
        success: true,
        location,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
    };

exports.displayLocations = async(req, res, next) => {
    try {
        const locations = await Location.find();
        res.status(201).json({
            success: true,
            locations
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};