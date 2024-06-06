const express = require('express');
const router = express.Router();
const {signup, signin, logout, singleUser, userProfile, verifyEmail} = require('../controllers/address.js');
const {isAuthenicated} = require('../middleware/auth');


// router.get('/user/:id', isAuthenicated, singleUser);

module.exports = router;