import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Create a new User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, avatar_url } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password_hash,
      role: "CLIENT",
      name,
      avatar_url,
    });

    const userResponse: any = user.toJSON();
    delete userResponse.password_hash; //Don't send passwords

    res.status(201).json(userResponse);
  } catch (error: any) {
    console.error('Error creating user:', error);
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password_hash'] } // Don't send passwords
    });
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password_hash'] } // Yet again, don't send passwords
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { email, password, role, name, avatar_url } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let password_hash = user.password_hash;
    if (password) {
      password_hash = await bcrypt.hash(password, 10);
    }

    await user.update({
      email,
      password_hash,
      role,
      name,
      avatar_url,
    });

    const userResponse: any = user.toJSON();
    delete userResponse.password_hash;

    res.status(200).json(userResponse);
  } catch (error: any) {
    console.error('Error updating user:', error);
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error: any) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
