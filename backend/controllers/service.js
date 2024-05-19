const User = require('../models/user');
const Review = require('../models/review');
const Car = require('../models/car');
const ErrorResponse = require('../utils/errorResponse');
const Location = require('../models/location');
const Facility = require('../models/facility');

exports.allServices = async(req, res, next) => {
    try {
        const services = await User.find({role: 2}).populate('location');
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.getServiceByName = async(req, res, next) => {
    try {
        const {name} = req.params;
        const service = await User.findOne({name}).populate('location');
        if (!service) {
            return next(new ErrorResponse('Service not found', 404));
        }
        res.status(200).json({
            success: true,
            service
        });
    } catch (error) {
        next(error);
    }
};

exports.getReviews = async(req, res, next) => {
    try {
        const {name} = req.params;
        const userTo = await User.findOne({name});

        if (!userTo) {
            return next(new ErrorResponse('Service not found', 404));
        }
        const reviews = await Review.find({userTo: userTo._id}).populate('userFrom');
        res.status(200).json({
            success: true,
            reviews: reviews
        });
    } catch (error) {
        next(error);
    }
}

exports.serviceFilter = async(req, res, next) => {
    try {
        let {cars, locations, facilities} = req.body;
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, location: {$in: locations}, facilities: {$in: facilities}}).populate('location');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByLocationAndCars = async(req, res, next) => {
    try {
        let {cars, locations} = req.body;
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, location: {$in: locations}}).populate('location');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByFacilityAndCars = async(req, res, next) => {
    try {
        let {cars, facilities} = req.body;
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, facilities: {$in: facilities}}).populate('location');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByCars = async(req, res, next) => {
    try {
        let {cars} = req.body;
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}}).populate('location');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByLocation = async(req, res, next) => {
    try {
        const {locations} = req.body;
        
        const services = await User.find({role: 2, location: {$in: locations}}).populate('location');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByFacility = async(req, res, next) => {
    try {
        const {facilities} = req.body;

        const services = await User.find({role: 2, facilities: {$in: facilities}}).populate('location');
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByLocationAndFacility = async(req, res, next) => {
    try {
        const {locations, facilities} = req.body;
        const services = await User.find({role: 2, location: {$in: locations}, facilities: {$in: facilities}}).populate('location');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
}