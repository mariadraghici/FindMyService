const express = require('express');
const router = express.Router();
const {createProduct, displayProduct} = require('../controllers/product');

router.post('/product/create', createProduct);
router.get('/products/all', displayProduct);

module.exports = router;