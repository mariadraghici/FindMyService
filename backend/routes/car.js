const express = require('express');
const router = express.Router();
const {createCar, displayCar} = require('../controllers/car');

router.post('/car/create', createCar);
router.get('/car/all', displayCar);

module.exports = router;