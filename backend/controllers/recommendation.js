const Recommendation = require('../models/recommendation');
const ErrorResponse = require('../utils/errorResponse');

exports.createRecommendation = async(req, res, next) => {
    try {
        const recommendation = await Recommendation.create(req.body);
        res.status(201).json({
            success: true,
            recommendation
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.displayRecommendations = async(req, res, next) => {
    try {
        const {page, limit} = req.query;
        const recommendations = await Recommendation.find().limit(limit * 1).skip((page - 1) * limit).populate('userFrom');

        const totalRecommendations = await Recommendation.countDocuments();

        res.status(200).json({
            success: true,
            recommendations,
            totalPages: Math.ceil(totalRecommendations / limit)
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteRecommendation = async(req, res, next) => {
    try {
        const recommendation = await Recommendation.findById(req.params.id);

        if (!recommendation) {
            return next(new ErrorResponse("Recommendation not found", 400));
        }

        await recommendation.remove();

        res.status(200).json({
            success: true,
            message: "Recommendation deleted"
        });
    } catch (error) {
        next(error);
    }
}