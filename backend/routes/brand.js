const express = require('express');
const router = express.Router();
const {createBrand} = require('../controllers/brand');

router.post('/brand/create', createBrand);

module.exports = router;