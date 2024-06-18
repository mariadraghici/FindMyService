const express = require('express');
const router = express.Router();
const {allServices, getServiceByName, getReviews, serviceFilter, serviceFilterOnlyByFacility,
    serviceFilterOnlyByCity, serviceFilterOnlyByCityAndFacility,
serviceFilterOnlyByFacilityAndCars, serviceFilterOnlyByCityAndCars, serviceFilterOnlyByCars,
serviceFilterOnlyByCityAndOthers, serviceFilterOnlyByFacilityAndOthers,
serviceFilterOnlyByCityAndFacilityAndOthers,
serviceFilterOnlyByOthers, editDescription, editSchedule, updateAndGetNewOffers, resetNewOffers, getNewOffers} = require('../controllers/service');
const {isAuthenicated} = require('../middleware/auth');


router.get('/service/all', isAuthenicated, allServices);
router.get('/service/page/:name', isAuthenicated, getServiceByName);
router.get('/service/reviews/:name', isAuthenicated, getReviews);
router.post('/service/filter', isAuthenicated, serviceFilter);
router.post('/service/filter/facility', isAuthenicated, serviceFilterOnlyByFacility);
router.post('/service/filter/location', isAuthenicated, serviceFilterOnlyByCity);
router.post('/service/filter/locationfacility', isAuthenicated, serviceFilterOnlyByCityAndFacility);
router.post('/service/filter/facilitycars', isAuthenicated, serviceFilterOnlyByFacilityAndCars);
router.post('/service/filter/locationcars', isAuthenicated, serviceFilterOnlyByCityAndCars);
router.post('/service/filter/cars', isAuthenicated, serviceFilterOnlyByCars);
router.post('/service/filter/locationothers', isAuthenicated, serviceFilterOnlyByCityAndOthers);
router.post('/service/filter/facilityothers', isAuthenicated, serviceFilterOnlyByFacilityAndOthers);
router.post('/service/filter/locationfacilityothers', isAuthenicated, serviceFilterOnlyByCityAndFacilityAndOthers);
router.post('/service/filter/others', isAuthenicated, serviceFilterOnlyByOthers);
router.put('/service/edit/:id', isAuthenicated, editDescription);
router.put('/service/schedule/:id', isAuthenicated, editSchedule);
router.put('/service/updateAndGetNewOffers/', isAuthenicated, updateAndGetNewOffers);
router.put('/service/resetOffers', isAuthenicated, resetNewOffers);
router.get('/service/getNewOffers', isAuthenicated, getNewOffers);

module.exports = router;