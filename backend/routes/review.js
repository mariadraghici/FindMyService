const express = require('express');
const router = express.Router();
const {createReview, getMyFeedback} = require('../controllers/review');
const {isAuthenicated} = require('../middleware/auth');


router.post('/feedback/create', isAuthenicated, createReview);
router.get('/myfeedback', isAuthenicated, getMyFeedback);

module.exports = router;