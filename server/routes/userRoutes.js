const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new User
router.post('/', userController.createUser);

// Get all Users
router.get('/', userController.getAllUsers);

// Get a single User by ID
router.get('/:id', userController.getUserById);

// Update a User by ID
router.put('/:id', userController.updateUser);

// Delete a User by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
