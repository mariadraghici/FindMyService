const express = require('express');
const router = express.Router();
const {createServiceFacility, getServiceFacilitiesByServiceId, deleteServiceFacility} = require('../controllers/serviceFacility');

router.post('/serviceFacility/create', createServiceFacility);
router.get('/serviceFacility/service/:id', getServiceFacilitiesByServiceId);
router.delete('/serviceFacility/delete/:id', deleteServiceFacility);

module.exports = router;