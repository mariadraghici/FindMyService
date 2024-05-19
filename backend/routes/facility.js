const express = require('express');
const router = express.Router();
const { createFacility, getFacilities } = require('../controllers/facility');

router.route('/facility/create').post(createFacility);
router.route('/facility/all').get(getFacilities);

module.exports = router;