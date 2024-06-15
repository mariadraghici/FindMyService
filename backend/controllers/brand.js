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
        next(error);
    }
};

exports.displayBrands = async(req, res, next) => {
    try {
        const brands = await Brand.find().populate('models');
        res.status(200).json({
            success: true,
            brands
        });
    } catch (error) {
        next(error);
    }
};

exports.updateBrand = async(req, res, next) => {
    try {
        const updatedBrand = await Brand.findOneAndUpdate({_id: req.params.id}, {$push: {models: req.body.modelId}}, {includeResultMetadata: true});
        res.status(200).json({
            success: true,
            updatedBrand
        });
    } catch (error) {
        next(error);
    }
};