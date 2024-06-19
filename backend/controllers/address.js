const Address = require('../models/address')
const User = require('../models/user')

exports.createAddress = async (req, res, next) => {
    try {
        const {lat, lng, address} = req.body
        const addressRecord = await Address.create({userId: req.user._id, lat, lng, address})

        const user = await User.findById(req.user._id)
        user.address = addressRecord._id

        await user.save()

        res.status(201).json({
            success: true,
            address
        })
    } catch (error) {
        next(error)
    }
}