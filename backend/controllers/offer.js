const Offer = require('../models/offer');
const ErrorResponse = require('../utils/errorResponse');

exports.createOffer = async(req, res, next) => {
    try {
        const offer = await Offer.create(req.body);
        res.status(201).json({
            success: true,
            offer
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.displayOffers = async(req, res, next) => {
    try {
        const offers = await Offer.find({userTo: req.user._id}).populate('userFrom');
        res.status(201).json({
            success: true,
            offers
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteOffer = async(req, res, next) => {
    try {
        await Offer.deleteOne({_id: req.params.id});
        res.status(200).json({
            success: true,
            message: 'Offer deleted successfully!'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}