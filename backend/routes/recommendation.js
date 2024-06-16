const express = require('express');
const router = express.Router();
const {createRecommendation, displayRecommendations, deleteRecommendation} = require('../controllers/recommendation');

router.post('/recommendation/create', createRecommendation);
router.get('/recommendations/display', displayRecommendations);
router.delete('/recommendation/delete/:id', deleteRecommendation);

module.exports = router;