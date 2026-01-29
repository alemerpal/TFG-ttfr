const { Local, WorkerProfile } = require('../models');

exports.createLocal = async (req, res) => {
  try {
    const { worker_id, title, description, base_price, capacity, location_lat, location_lng, address_text } = req.body;

    const worker = await WorkerProfile.findByPk(worker_id);
    if (!worker) {
      return res.status(404).json({ error: 'WorkerProfile not found.' });
    }

    const local = await Local.create({
      worker_id,
      title,
      description,
      base_price,
      capacity,
      location_lat,
      location_lng,
      address_text,
    });
    res.status(201).json(local);
  } catch (error) {
    console.error('Error creating local:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllLocals = async (req, res) => {
  try {
    const locals = await Local.findAll();
    res.status(200).json(locals);
  } catch (error) {
    console.error('Error fetching locals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLocalById = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findByPk(id);
    if (!local) {
      return res.status(404).json({ error: 'Local not found' });
    }
    res.status(200).json(local);
  } catch (error) {
    console.error('Error fetching local by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_id, title, description, base_price, capacity, location_lat, location_lng, address_text } = req.body;

    const local = await Local.findByPk(id);
    if (!local) {
      return res.status(404).json({ error: 'Local not found' });
    }

    // Optional: Basic validation if worker_id exists and is being updated
    if (worker_id) {
      const worker = await WorkerProfile.findByPk(worker_id);
      if (!worker) {
        return res.status(404).json({ error: 'WorkerProfile not found.' });
      }
    }

    await local.update({
      worker_id,
      title,
      description,
      base_price,
      capacity,
      location_lat,
      location_lng,
      address_text,
    });
    res.status(200).json(local);
  } catch (error) {
    console.error('Error updating local:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findByPk(id);
    if (!local) {
      return res.status(404).json({ error: 'Local not found' });
    }

    await local.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting local:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
