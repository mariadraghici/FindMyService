const express = require('express');
const router = express.Router();
const {createBrand, displayBrands, updateBrand} = require('../controllers/brand');

router.post('/brand/create', createBrand);
router.get('/brand/all', displayBrands);
router.put('/brand/update/:id', updateBrand);

module.exports = router;