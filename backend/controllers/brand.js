const Brand = require('../models/brand');
const ErrorResponse = require('../utils/errorResponse');


exports.createBrand = async(req, res, next) => {

    try {
       const brand = await Brand.create(req.body);
        res.status(201).json({
            success: true,
            brand
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};