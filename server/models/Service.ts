import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface ServiceAttributes {
  id?: string;
  worker_id?: string;
  local_id?: string;
  title: string;
  description?: string;
  base_price: number;
  capacity?: number;
}

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: string;
  public worker_id?: string;
  public local_id?: string;
  public title!: string;
  public description?: string;
  public base_price!: number;
  public capacity?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Custom validation method
  public hasWorkerOrLocal(): void {
    if (!this.worker_id && !this.local_id) {
      throw new Error('A service must be associated with either a worker or a local.');
    }
  }
}

Service.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  worker_id: {
    type: DataTypes.UUID, //FK WorkerProfile
    allowNull: true,
  },
  local_id: {
    type: DataTypes.UUID, //FK Local
    allowNull: true,
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
    allowNull: true,
    validate: {
      min: 0,
    },
  },
}, {
  sequelize,
  tableName: 'services',
  timestamps: false,
  validate: {
    hasWorkerOrLocal() {
      if (!this.worker_id && !this.local_id) {
        throw new Error('A service must be associated with either a worker or a local.');
      }
    },
  },
});

export default Service;
