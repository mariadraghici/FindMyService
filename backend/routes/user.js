const express = require('express');
const router = express.Router();
const {addCar} = require('../controllers/user');
const {isAuthenicated} = require('../middleware/auth');


module.exports = router;