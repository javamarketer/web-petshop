const express = require('express');
const petshopRoutes = require('./petshops');
const productRoutes = require('./products');
const compareRoutes = require('./compare');

const router = express.Router();

// Petshop routes
router.use('/petshops', petshopRoutes);

// Product routes
router.use('/products', productRoutes);

// Compare routes
router.use('/compare', compareRoutes);

module.exports = router;
