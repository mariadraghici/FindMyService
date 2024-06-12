const User = require('../models/user');
const Review = require('../models/review');
const Car = require('../models/car');
const ErrorResponse = require('../utils/errorResponse');
const City = require('../models/city');
const Facility = require('../models/facility');
const serviceFacility = require('../models/serviceFacility');
const mongoose = require('mongoose');

exports.allServices = async(req, res, next) => {
    try {
        const services = await User.find({role: 2}).populate('city').populate('facilities').populate('address').populate('images');
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
        const service = await User.findOne({name}).populate('city').populate('facilities').populate('address');
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
        const reviews = await Review.find({userTo: userTo._id}).populate('userFrom').populate('car');
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
        let {cars, cities, serviceFacilities} = req.body;

        let facilities = await serviceFacility.find({facilityId: {$in: serviceFacilities}});
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, city: {$in: cities}, facilities: {$in: facilities}})
        .populate('city').populate('facilities').populate('address').populate('images');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByCityAndCars = async(req, res, next) => {
    try {
        let {cars, cities} = req.body;
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, city: {$in: cities}})
        .populate('city').populate('facilities').populate('address').populate('images');
        
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
        let {cars, serviceFacilities} = req.body;

        let facilities = await serviceFacility.find({facilityId: {$in: serviceFacilities}});
        const cars_info = await Car.find({_id: {$in: cars}});
        let reviews = [];
        let all_reviews = [];

        await Promise.all(cars_info.map(async(car) => {
            reviews = await Review.find({brand: car.brand, model: car.model, engine: car.engine})
            all_reviews = all_reviews.concat(reviews);
        }));

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, facilities: {$in: facilities}})
        .populate('city').populate('facilities').populate('address').populate('images');
        
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

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}})
        .populate('city').populate('facilities').populate('address').populate('images');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByCity = async(req, res, next) => {
    try {
        const {cities} = req.body;
        
        const services = await User.find({role: 2, city: {$in: cities}})
        .populate('city').populate('facilities').populate('address').populate('images');

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
        const {serviceFacilities} = req.body;
        console.log(serviceFacilities);

        let facilities = await serviceFacility.find({facilityId: {$in: serviceFacilities}});

        const services = await User.find({role: 2, facilities: {$in: facilities}})
        .populate('city').populate('facilities').populate('address').populate('images');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
};

exports.serviceFilterOnlyByCityAndFacility = async(req, res, next) => {
    try {
        const {cities, serviceFacilities} = req.body;

        let facilities = await serviceFacility.find({facilityId: {$in: serviceFacilities}});
        const services = await User.find({role: 2, city: {$in: cities}, facilities: {$in: facilities}})
        .populate('city').populate('facilities').populate('address').populate('images');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
}

exports.serviceFilterOnlyByCityAndOthers = async(req, res, next) => {
    try {
        const {cities, others} = req.body;
        const {brand, model, engine} = others;
        let reviews = [];
        let all_reviews = [];

        if (brand !== '' && model !== '' && engine !== '') {
            reviews = await Review.find({brandName: brand, modelName: model, engine: engine});
            all_reviews = all_reviews.concat(reviews);
        } else if (brand !== '' && model !== '') {
            reviews = await Review.find({brandName: brand, modelName: model});
            all_reviews = all_reviews.concat(reviews);
        } else {
            reviews = await Review.find({brandName: brand})
            all_reviews = all_reviews.concat(reviews);
        }

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, city: {$in: cities}})
        .populate('city').populate('facilities').populate('address').populate('images');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
}

exports.serviceFilterOnlyByFacilityAndOthers = async(req, res, next) => {
    try {
        const {others, serviceFacilities} = req.body;

        let facilities = await serviceFacility.find({facilityId: {$in: serviceFacilities}});
        const {brand, model, engine} = others;
        let reviews = [];
        let all_reviews = [];

        if (brand !== '' && model !== '' && engine !== '') {
            reviews = await Review.find({brandName: brand, modelName: model, engine: engine});
            all_reviews = all_reviews.concat(reviews);
        } else if (brand !== '' && model !== '') {
            reviews = await Review.find({brandName: brand, modelName: model});
            all_reviews = all_reviews.concat(reviews);
        } else {
            reviews = await Review.find({brandName: brand})
            all_reviews = all_reviews.concat(reviews);
        }

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, facilities: {$in: facilities}})
        .populate('city').populate('facilities').populate('address').populate('images');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
}

exports.serviceFilterOnlyByCityAndFacilityAndOthers = async(req, res, next) => {
    try {
        const {cities, others, serviceFacilities} = req.body;

        let facilities = await serviceFacility.find({facilityId: {$in: serviceFacilities}});
        const {brand, model, engine} = others;
        let reviews = [];
        let all_reviews = [];

        if (brand !== '' && model !== '' && engine !== '') {
            reviews = await Review.find({brandName: brand, modelName: model, engine: engine});
            all_reviews = all_reviews.concat(reviews);
        } else if (brand !== '' && model !== '') {
            reviews = await Review.find({brandName: brand, modelName: model});
            all_reviews = all_reviews.concat(reviews);
        } else {
            reviews = await Review.find({brandName: brand})
            all_reviews = all_reviews.concat(reviews);
        }

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}, city: {$in: cities}, facilities: {$in: facilities}})
        .populate('city').populate('facilities').populate('address').populate('images');

        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
}

exports.serviceFilterOnlyByOthers = async(req, res, next) => {
    try {
        const {others} = req.body;
        const {brand, model, engine} = others;
        let reviews = [];
        let all_reviews = [];

        if (brand !== '' && model !== '' && engine !== '') {
            reviews = await Review.find({brandName: brand, modelName: model, engine: engine});
            all_reviews = all_reviews.concat(reviews);
        } else if (brand !== '' && model !== '') {
            reviews = await Review.find({brandName: brand, modelName: model});
            all_reviews = all_reviews.concat(reviews);
        } else {
            reviews = await Review.find({brandName: brand})
            all_reviews = all_reviews.concat(reviews);
        }

        const services = await User.find({role: 2, _id: {$in: all_reviews.map(review => review.userTo)}})
        .populate('city').populate('facilities').populate('address').populate('images');
        
        res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        next(error);
    }
}

exports.editDescription = async(req, res, next) => {
    try {
        const {description} = req.body;
        const user = await User.findById(req.user._id);
        user.description = description;
        await user.save();
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}

exports.editSchedule = async(req, res, next) => {
    try {
        const {schedule} = req.body;
        const user = await User.findById(req.user._id);

        user.schedule = schedule;
        await user.save();
        res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        next(error);
    }
}

exports.updateAndGetNewOffers = async (req, res, next) => {
    try {

        console.log(req.body);
        const user = await User.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(req.body.userId)
        }, {
            $push: {
                newOffers: req.body.offer
            }
        }, {
            new: true
        });
        // user.newOffers.push(req.body.offerId);

        // await user.save();
        console.log(user);

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}

exports.resetNewOffers = async(req, res, next) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.body.userId) },
            { $set: { newOffers: [] } },
            { new: true }
        );

        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}