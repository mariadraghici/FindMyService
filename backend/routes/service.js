const express = require('express');
const router = express.Router();
const {allServices, getServiceByName, getReviews, serviceFilter, serviceFilterOnlyByFacility,
    serviceFilterOnlyByLocation, serviceFilterOnlyByLocationAndFacility,
serviceFilterOnlyByFacilityAndCars, serviceFilterOnlyByLocationAndCars, serviceFilterOnlyByCars} = require('../controllers/service');
const {isAuthenicated} = require('../middleware/auth');


router.get('/service/all', isAuthenicated, allServices);
router.get('/service/page/:name', isAuthenicated, getServiceByName);
router.get('/service/reviews/:name', isAuthenicated, getReviews);
router.post('/service/filter', isAuthenicated, serviceFilter);
router.post('/service/filter/facility', isAuthenicated, serviceFilterOnlyByFacility);
router.post('/service/filter/location', isAuthenicated, serviceFilterOnlyByLocation);
router.post('/service/filter/locationfacility', isAuthenicated, serviceFilterOnlyByLocationAndFacility);
router.post('/service/filter/facilitycars', isAuthenicated, serviceFilterOnlyByFacilityAndCars);
router.post('/service/filter/locationcars', isAuthenicated, serviceFilterOnlyByLocationAndCars);
router.post('/service/filter/cars', isAuthenicated, serviceFilterOnlyByCars);

module.exports = router;