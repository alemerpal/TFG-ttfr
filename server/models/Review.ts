import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface ReviewAttributes {
  id?: string;
  booking_id: string;
  booking_type: 'BookingLocal' | 'BookingService';
  reviewer_id: string;
  worker_id?: string;
  rating: number;
  comment?: string;
}

class Review extends Model<ReviewAttributes> implements ReviewAttributes {
  public id!: string;
  public booking_id!: string;
  public booking_type!: 'BookingLocal' | 'BookingService';
  public reviewer_id!: string;
  public worker_id?: string;
  public rating!: number;
  public comment?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  booking_id: { // Polymorphic FK
    type: DataTypes.UUID, //FK Booking
    allowNull: false,
  },
  booking_type: {
    type: DataTypes.ENUM('BookingLocal', 'BookingService'),
    allowNull: false,
  },
  reviewer_id: {
    type: DataTypes.UUID, //FK Review
    allowNull: false,
  },
  worker_id: {
    type: DataTypes.UUID, //FK WorkerProfile
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'reviews',
  timestamps: false,
});

export default Review;