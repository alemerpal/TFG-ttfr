const Service = require('../models/Service');
const WorkerProfile = require('../models/WorkerProfile');
const Local = require('../models/Local');

exports.createService = async (req, res) => {
  try {
    const { worker_id, local_id, title, description, base_price, capacity } = req.body;

    if (!worker_id && !local_id) {
      return res.status(400).json({ error: 'A service must be associated with either a worker or a local.' });
    }

    if (worker_id) {
      const worker = await WorkerProfile.findByPk(worker_id);
      if (!worker) {
        return res.status(404).json({ error: 'WorkerProfile not found.' });
      }
    }

    if (local_id) {
      const local = await Local.findByPk(local_id);
      if (!local) {
        return res.status(404).json({ error: 'Local not found.' });
      }
    }

    const service = await Service.create({
      worker_id,
      local_id,
      title,
      description,
      base_price,
      capacity,
    });
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_id, local_id, title, description, base_price, capacity } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (!worker_id && !local_id && !service.worker_id && !service.local_id) {
        return res.status(400).json({ error: 'A service must be associated with either a worker or a local.' });
    }


    if (worker_id) {
      const worker = await WorkerProfile.findByPk(worker_id);
      if (!worker) {
        return res.status(404).json({ error: 'WorkerProfile not found.' });
      }
    }

    if (local_id) {
      const local = await Local.findByPk(local_id);
      if (!local) {
        return res.status(404).json({ error: 'Local not found.' });
      }
    }

    await service.update({
      worker_id,
      local_id,
      title,
      description,
      base_price,
      capacity,
    });
    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
