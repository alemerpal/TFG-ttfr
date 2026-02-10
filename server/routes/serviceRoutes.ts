import express from 'express';
const router = express.Router();
import * as serviceController from '../controllers/serviceController';

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

export default router;
