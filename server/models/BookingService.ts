import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface BookingServiceAttributes {
  id?: string;
  client_id: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
  total_price: number;
  time_slot_id: string;
  booking_local_id?: string;
  notes?: string;
}

class BookingService extends Model<BookingServiceAttributes> implements BookingServiceAttributes {
  public id!: string;
  public client_id!: string;
  public status!: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
  public total_price!: number;
  public time_slot_id!: string;
  public booking_local_id?: string;
  public notes?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BookingService.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.UUID, //FK User
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'),
    allowNull: false,
    defaultValue: 'PENDING',
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0,
    },
  },
  time_slot_id: {
    type: DataTypes.UUID, //FK TimeSlot
    allowNull: false,
  },
  booking_local_id: {
    type: DataTypes.UUID, //FK BookingLocal
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'booking_services',
  timestamps: false,
});

export default BookingService;