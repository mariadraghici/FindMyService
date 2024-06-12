const Review = require('../models/review');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse')

exports.createReview = async (req, res, next) => {
    try {
        const review = await Review.create(req.body)

        const user = await User.findById(req.body.userFrom);
        user.reviews.push(review._id);
        await user.save();

        const service = await User.findById(req.body.userTo);
        service.reviews.push(review._id);
        await service.save();

        service.rating = (service.rating + req.body.rating) / service.reviews.length;
        await service.save();

        res.status(201).json(
            {
                success: true,
                review
            }
        );
    } catch (error) {
        next(error);
    }
}

exports.getMyFeedback = async (req, res, next) => {
    try {
        const reviews = await Review.find({userFrom: req.user._id}).populate('car');

        res.status(200).json(
            {
                succes: true,
                reviews
            }
        );
    }
    catch (error) {
        next(error);
    }
}
