const express = require('express');
const router = express.Router();
const {signup, signin, logout, singleUser, userProfile, verifyEmail} = require('../controllers/auth');
const {isAuthenicated} = require('../middleware/auth');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/user/:id', singleUser);
router.get('/profile', isAuthenicated, userProfile);
router.get('/verifyEmail', verifyEmail);

module.exports = router;