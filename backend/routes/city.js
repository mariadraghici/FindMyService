const express = require('express');
const router = express.Router();
const {createCity, displayCities} = require('../controllers/city');

router.post('/city/create', createCity);
router.get('/city/all', displayCities);

module.exports = router;