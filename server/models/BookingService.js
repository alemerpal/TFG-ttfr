const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // Import User model
const TimeSlot = require('./TimeSlot'); // Import TimeSlot model
const BookingLocal = require('./BookingLocal'); // Import BookingLocal model

const BookingService = sequelize.define('BookingService', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
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
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: TimeSlot,
      key: 'id',
    },
  },
  booking_local_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: BookingLocal,
      key: 'id',
    },
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'booking_services',
  timestamps: false,
});

User.hasMany(BookingService, { foreignKey: 'client_id', onDelete: 'CASCADE' });
BookingService.belongsTo(User, { foreignKey: 'client_id' });

TimeSlot.hasOne(BookingService, { foreignKey: 'time_slot_id', onDelete: 'CASCADE' });
BookingService.belongsTo(TimeSlot, { foreignKey: 'time_slot_id' });

BookingService.belongsTo(BookingLocal, { foreignKey: 'booking_local_id' });

module.exports = BookingService;
