import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface LocalAttributes {
  id?: string;
  worker_id: string;
  title: string;
  description?: string;
  base_price: number;
  capacity: number;
  location_lat?: number;
  location_lng?: number;
  address_text?: string;
}

class Local extends Model<LocalAttributes> implements LocalAttributes {
  public id!: string;
  public worker_id!: string;
  public title!: string;
  public description?: string;
  public base_price!: number;
  public capacity!: number;
  public location_lat?: number;
  public location_lng?: number;
  public address_text?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Local.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  worker_id: {
    type: DataTypes.UUID, //FK WorkerProfile
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  base_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  location_lat: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  location_lng: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
  address_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'locals',
  timestamps: false,
});

export default Local;
