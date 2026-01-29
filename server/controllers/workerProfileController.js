const User = require('../models/User');
const WorkerProfile = require('../models/WorkerProfile')
const bcrypt = require('bcryptjs');

exports.createWorkerProfile = async (req, res) => {
  try {
    const { email, password, name, avatar_url, display_name, description, phone } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password_hash,
      role: 'WORKER',
      name,
      avatar_url,
    });

    const workerProfile = await WorkerProfile.create({
      user_id: user.id,
      display_name,
      description,
      phone,
    });

    const userResponse = user.toJSON();
    delete userResponse.password_hash;

    res.status(201).json({ user: userResponse, workerProfile });
  } catch (error) {
    console.error('Error creating worker profile:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWorkerProfiles = async (req, res) => {
  try {
    const workerProfiles = await WorkerProfile.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password_hash'] }
      }]
    });
    res.status(200).json(workerProfiles);
  } catch (error) {
    console.error('Error fetching worker profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getWorkerProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const workerProfile = await WorkerProfile.findByPk(id, {
      include: [{
        model: User,
        attributes: { exclude: ['password_hash'] }
      }]
    });
    if (!workerProfile) {
      return res.status(404).json({ error: 'WorkerProfile not found' });
    }
    res.status(200).json(workerProfile);
  } catch (error) {
    console.error('Error fetching worker profile by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateWorkerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, name, avatar_url, display_name, description, phone } = req.body;

    const workerProfile = await WorkerProfile.findByPk(id, {
      include: [User]
    });
    if (!workerProfile) {
      return res.status(404).json({ error: 'WorkerProfile not found' });
    }

    const user = workerProfile.User;

    if (user) {
      let password_hash = user.password_hash;
      if (password) {
        password_hash = await bcrypt.hash(password, 10);
      }

      await user.update({
        email,
        password_hash,
        name,
        avatar_url,
      });
    }

    await workerProfile.update({
      display_name,
      description,
      phone,
    });

    const updatedWorkerProfile = await WorkerProfile.findByPk(id, {
        include: [{
            model: User,
            attributes: { exclude: ['password_hash'] }
        }]
    });

    res.status(200).json(updatedWorkerProfile);
  } catch (error) {
    console.error('Error updating worker profile:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteWorkerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const workerProfile = await WorkerProfile.findByPk(id);
    if (!workerProfile) {
      return res.status(404).json({ error: 'WorkerProfile not found' });
    }

    const user = await User.findByPk(workerProfile.user_id);
    if (user) {
      await user.destroy(); //Cascades
    } else {
      await workerProfile.destroy();
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting worker profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
