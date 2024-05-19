const express = require('express');
const router = express.Router();
const {createLocation, displayLocations} = require('../controllers/location');

router.post('/location/create', createLocation);
router.get('/location/all', displayLocations);

module.exports = router;