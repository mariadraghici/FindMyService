const express = require('express');
const router = express.Router();
const {signup, signin, logout, singleUser, userProfile, verifyEmail} = require('../controllers/auth');
const {isAuthenicated} = require('../middleware/auth');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/user/:id', isAuthenicated, singleUser);
router.get('/profile', isAuthenicated, userProfile);
router.get('/verifyEmail', verifyEmail);
router.get('/isAuthenicated', isAuthenicated, (req, res) => {
    res.status(200).send('Authenticated!');
});

module.exports = router;