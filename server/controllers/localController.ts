import { Request, Response } from 'express';
import Local from '../models/Local';
import WorkerProfile from '../models/WorkerProfile';

export const createLocal = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error('Error creating local:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllLocals = async (req: Request, res: Response) => {
  try {
    const locals = await Local.findAll();
    res.status(200).json(locals);
  } catch (error: any) {
    console.error('Error fetching locals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLocalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const local = await Local.findByPk(id);
    if (!local) {
      return res.status(404).json({ error: 'Local not found' });
    }
    res.status(200).json(local);
  } catch (error: any) {
    console.error('Error fetching local by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLocal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
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
  } catch (error: any) {
    console.error('Error updating local:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLocal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const local = await Local.findByPk(id);
    if (!local) {
      return res.status(404).json({ error: 'Local not found' });
    }

    await local.destroy();
    res.status(204).send(); // No content
  } catch (error: any) {
    console.error('Error deleting local:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
