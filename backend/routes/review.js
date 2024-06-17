const express = require('express');
const router = express.Router();
const {createReview, getMyFeedback, getReviewsForService} = require('../controllers/review');
const {isAuthenicated} = require('../middleware/auth');


router.post('/feedback/create', isAuthenicated, createReview);
router.get('/myfeedback', isAuthenicated, getMyFeedback);
router.get('/getreviewsservice/:name', getReviewsForService);

module.exports = router;