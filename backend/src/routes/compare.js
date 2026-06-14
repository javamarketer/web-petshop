const express = require('express');
const compareController = require('../controllers/compareController');

const router = express.Router();

// Compare product prices
router.get('/', compareController.compareProductPrice);

// Get top cheapest products
router.get('/top/cheapest', compareController.getTopCheapestProducts);

module.exports = router;
