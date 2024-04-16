const Facility = require("../models/facility");
const ErrorResponse = require("../utils/errorResponse");

exports.createFacility = async (req, res, next) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({
      success: true,
      facility,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};