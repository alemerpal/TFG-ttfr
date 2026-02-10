import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface WorkerProfileAttributes {
  id?: string;
  user_id: string;
  display_name: string;
  description?: string;
  phone?: string;
}

class WorkerProfile extends Model<WorkerProfileAttributes> implements WorkerProfileAttributes {
  public id!: string;
  public user_id!: string;
  public display_name!: string;
  public description?: string;
  public phone?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WorkerProfile.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID, //FK User
    allowNull: false,
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'worker_profiles',
  timestamps: false,
});

export default WorkerProfile;