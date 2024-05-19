const express = require('express');
const router = express.Router();
const {userCars} = require('../controllers/user');
const {isAuthenicated} = require('../middleware/auth');


router.get('/getUserCars', isAuthenicated, userCars);

module.exports = router;