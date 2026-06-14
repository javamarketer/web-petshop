const express = require('express');
const petshopController = require('../controllers/petshopController');

const router = express.Router();

// Get all petshops
router.get('/', petshopController.getAllPetshops);

// Get petshop by ID
router.get('/:id', petshopController.getPetshopById);

// Create petshop (admin - future)
// router.post('/', petshopController.createPetshop);

// Update petshop (admin - future)
// router.put('/:id', petshopController.updatePetshop);

// Delete petshop (admin - future)
// router.delete('/:id', petshopController.deletePetshop);

module.exports = router;
