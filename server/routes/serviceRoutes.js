const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Create a new Service
router.post('/', serviceController.createService);

// Get all Services
router.get('/', serviceController.getAllServices);

// Get a single Service by ID
router.get('/:id', serviceController.getServiceById);

// Update a Service by ID
router.put('/:id', serviceController.updateService);

// Delete a Service by ID
router.delete('/:id', serviceController.deleteService);

module.exports = router;
