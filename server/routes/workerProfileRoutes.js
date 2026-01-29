const express = require('express');
const router = express.Router();
const workerProfileController = require('../controllers/workerProfileController');

// Create a new WorkerProfile (and associated User)
router.post('/', workerProfileController.createWorkerProfile);

// Get all WorkerProfiles
router.get('/', workerProfileController.getAllWorkerProfiles);

// Get a single WorkerProfile by ID
router.get('/:id', workerProfileController.getWorkerProfileById);

// Update a WorkerProfile by ID
router.put('/:id', workerProfileController.updateWorkerProfile);

// Delete a WorkerProfile by ID
router.delete('/:id', workerProfileController.deleteWorkerProfile);

module.exports = router;
