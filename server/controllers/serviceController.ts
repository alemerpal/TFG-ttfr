import { Request, Response } from 'express';
import Service from '../models/Service';
import WorkerProfile from '../models/WorkerProfile';
import Local from '../models/Local';

export const createService = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error: any) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error: any) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { worker_id, local_id, title, description, base_price, capacity } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Cast service to 'any' to access properties that might not be directly on the Sequelize model instance
    if (!worker_id && !local_id && !(service as any).worker_id && !(service as any).local_id) {
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
  } catch (error: any) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();
    res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
