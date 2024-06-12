const express = require('express');
const router = express.Router();
const {createAuction, displayAuctions, displayAuction, deleteAuction, getCommentsForAuction} = require('../controllers/auction');
const {isAuthenicated} = require('../middleware/auth');

router.post('/auction/create', isAuthenicated, createAuction);
router.get('/auction/all', isAuthenicated, displayAuctions);
router.get('/auction/:id', isAuthenicated, displayAuction);
router.delete('/auction/:id', isAuthenicated, deleteAuction);
router.get('/auction/:id/comments', isAuthenicated, getCommentsForAuction);

module.exports = router;