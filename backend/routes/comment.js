const express = require('express');
const router = express.Router();
const {createCommentAndAddToAuction, getComments} = require('../controllers/comment');

router.post('/comment/create', createCommentAndAddToAuction);
router.get('/comment/:id', getComments);

module.exports = router;