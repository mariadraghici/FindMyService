const express = require('express');
const router = express.Router();
const {createAuction, displayAuctions, deleteAuction, getCommentsForAuction, displayAuctionsForUser} = require('../controllers/auction');
const {isAuthenicated} = require('../middleware/auth');

router.post('/auction/create', isAuthenicated, createAuction);
router.get('/auction/all', isAuthenicated, displayAuctions);
router.delete('/auction/:id/delete', isAuthenicated, deleteAuction);
router.get('/auction/:id/comments', isAuthenicated, getCommentsForAuction);
router.get('/auction/user', isAuthenicated, displayAuctionsForUser);

module.exports = router;