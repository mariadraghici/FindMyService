const express = require('express');
const router = express.Router();
const {createCar, displayCar, displayCarsByUserId, deleteCar} = require('../controllers/car');
const {isAuthenicated} = require('../middleware/auth');

router.post('/car/add', isAuthenicated, createCar);
router.get('/car/all', isAuthenicated, displayCar);
router.get('/mycars', isAuthenicated, displayCarsByUserId);
router.put('/mycars/delete', isAuthenicated, deleteCar);

module.exports = router;