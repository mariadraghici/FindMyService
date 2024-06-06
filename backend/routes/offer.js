const express = require('express');
const router = express.Router();
const {createOffer, displayOffers, deleteOffer} = require('../controllers/offer');
const {isAuthenicated} = require('../middleware/auth');

router.post('/offer/create', isAuthenicated ,createOffer);
router.get('/offers/display', isAuthenicated, displayOffers);
router.delete('/offers/delete/:id', isAuthenicated, deleteOffer);

module.exports = router;