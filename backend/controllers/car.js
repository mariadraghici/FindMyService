const Car = require('../models/car');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');


exports.createCar = async(req, res, next) => {
    try {

        const name = req.body.name;

        const carExists = await Car.findOne({ name });

        if (carExists) {
            return next(new ErrorResponse("Numele acesta de mașină deja există", 400));
        }
    
        const car = await Car.create({ ...req.body, user: req.user._id });

        if (!car) {
            return next(new ErrorResponse("Mașina nu a putut fi creată", 400));
        }
    
        const user = await User.findOneAndUpdate({ _id: req.user._id }, {$push: {cars: car._id}}, {includeResultMetadata: true});

        if (!user) {
            return next(new ErrorResponse("Utilizatorul nu a putut fi găsit", 400));
        }

        res.status(201).json({
            success: true,
            car
        });
    } catch (error) {
        next(error);
    }
};

exports.displayCar = async(req, res, next) => {

    try {
       const cars = await Car.find();
        res.status(201).json({
            success: true,
            cars
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.displayCarsByUserId = async(req, res, next) => {
        try {

            const { page = 1, limit = 10 } = req.query;
            const cars = await Car.find({ user: req.user._id }).skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 });

            if (!cars) {
                return next(new ErrorResponse("Mașinile nu au putut fi găstie!", 400));
            }

            const totalCars = await Car.countDocuments({ user: req.user._id });
        
            res.status(201).json({
                success: true,
                cars,
                totalPages: Math.ceil(totalCars / limit),
                currentPage: page,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
};

exports.deleteCar = async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {$pull: {cars: req.body.id}}, {new: true});
        const car = await Car.findByIdAndDelete(req.body.id);

        if (!car) {
            return next(new ErrorResponse("Mașina nu a putut fi găsită", 400));
        }

        res.status(201).json({
            success: true,
            car,
            user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};