const Model = require('../models/model');
const ErrorResponse = require('../utils/errorResponse');


exports.createModel = async(req, res, next) => {

    try {
        console.log(req.body.engines);
        const model = await Model.create(req.body);
        res.status(201).json({
            success: true,
            model
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.displayModels = async(req, res, next) => {

    try {
        const models = await Model.find();
        res.status(201).json({
            success: true,
            models
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};