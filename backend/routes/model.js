const express = require('express');
const router = express.Router();
const {createModel, displayModels} = require('../controllers/model');

router.post('/model/create', createModel);
router.get('/models/display', displayModels);

module.exports = router;