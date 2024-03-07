const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


exports.AddCar = async(req, res, next) => {

    try {
        const res = await User.updateOne({ _id: req.body.id }, {$push: {cars: req.body.carId }});
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};