import express from 'express';
const router = express.Router();
import * as localController from '../controllers/localController';

// Create a new Local
router.post('/', localController.createLocal);

// Get all Locals
router.get('/', localController.getAllLocals);

// Get a single Local by ID
router.get('/:id', localController.getLocalById);

// Update a Local by ID
router.put('/:id', localController.updateLocal);

// Delete a Local by ID
router.delete('/:id', localController.deleteLocal);

export default router;
