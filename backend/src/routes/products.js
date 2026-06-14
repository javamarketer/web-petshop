const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Get filter options
router.get('/filters', productController.getFilters);

// Get all products
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create product (admin - future)
// router.post('/', productController.createProduct);

// Update product (admin - future)
// router.put('/:id', productController.updateProduct);

// Delete product (admin - future)
// router.delete('/:id', productController.deleteProduct);

module.exports = router;
