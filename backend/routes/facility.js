const express = require('express');
const router = express.Router();
const { createFacility, getFacilities } = require('../controllers/facility');

router.post('/facility/create', createFacility);
router.get('/facility/:id', getFacilities);

module.exports = router;