import { Request, Response } from 'express';
import User from '../models/User';
import WorkerProfile from '../models/WorkerProfile';
import bcrypt from 'bcryptjs';

// Extend WorkerProfile type to include User association for TypeScript
interface WorkerProfileWithUser extends WorkerProfile {
  User?: User; // Assuming User is the imported User model type
}

export const createWorkerProfile = async (req: Request, res: Response) => {
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

    const userResponse: any = user.toJSON(); // Cast to any for delete
    delete userResponse.password_hash;

    res.status(201).json({ user: userResponse, workerProfile });
  } catch (error: any) {
    console.error('Error creating worker profile:', error);
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllWorkerProfiles = async (req: Request, res: Response) => {
  try {
    const workerProfiles = await WorkerProfile.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password_hash'] }
      }]
    });
    res.status(200).json(workerProfiles);
  } catch (error: any) {
    console.error('Error fetching worker profiles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getWorkerProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
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
  } catch (error: any) {
    console.error('Error fetching worker profile by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateWorkerProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { email, password, name, avatar_url, display_name, description, phone } = req.body;

    const workerProfile = await WorkerProfile.findByPk(id, {
      include: [User]
    }) as WorkerProfileWithUser | null; // Cast for type safety
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
  } catch (error: any) {
    console.error('Error updating worker profile:', error);
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteWorkerProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
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
  } catch (error: any) {
    console.error('Error deleting worker profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
