import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
  id?: string;
  email: string;
  password_hash: string;
  role: 'CLIENT' | 'WORKER';
  name: string;
  avatar_url?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'CLIENT' | 'WORKER';
  public name!: string;
  public avatar_url?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('CLIENT', 'WORKER'),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'users',
  timestamps: false,
});

export default User;