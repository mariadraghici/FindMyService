const ServiceFacility = require('../models/serviceFacility');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

exports.createServiceFacility = async (req, res, next) => {
    try {
        const {facilityId, name, priceLow, priceHigh, serviceId} = req.body;

        const alreadyExists = await ServiceFacility.findOne({ facilityId, serviceId });

        if (alreadyExists) {
            await alreadyExists.updateOne({ priceLow, priceHigh });
            return res.status(200).json({
                success: true,
                message: 'ServiceFacility updated',
            });
        }

        const serviceFacility = await ServiceFacility.create(req.body);

        const user = await User.findById(req.body.serviceId);

        user.facilities.push(serviceFacility._id);
        await user.save();

        res.status(201).json({
        success: true,
        serviceFacility,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getServiceFacilitiesByServiceId = async (req, res, next) => {
    try {
        const service = await User.find({ _id: req.params.id }).populate('serviceFacilities');
        const serviceFacilities = service.serviceFacilities;

        if (!serviceFacilities) {
            return next(new ErrorResponse('ServiceFacilities not found', 404));
        }

        res.status(200).json({
            success: true,
            serviceFacilities,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteServiceFacility = async (req, res, next) => {
    try {
        const serviceFacility = await ServiceFacility.findById(req.params.id);
        if (!serviceFacility) {
            return next(new ErrorResponse('ServiceFacility not found', 404));
        }

        const user = await User.findById(serviceFacility.serviceId);
        console.log(user);
        console.log(serviceFacility);
        user.facilities = user.facilities.filter(facility => 
            !facility._id.equals(serviceFacility._id)
        );
        console.log(user.facilities);
        await user.save();
        
        await serviceFacility.remove();

        res.status(200).json({
            success: true,
            message: 'ServiceFacility deleted',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
