const express = require('express');
const router = express.Router();
const {userCars, editDescription, editKm} = require('../controllers/user');
const {isAuthenicated} = require('../middleware/auth');


router.get('/getUserCars', isAuthenicated, userCars);
router.put('/mycars/editDescription', isAuthenicated, editDescription);
router.put('/mycars/editKm', isAuthenicated, editKm);

module.exports = router;