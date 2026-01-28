const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // Import User model
const TimeSlot = require('./TimeSlot'); // Import TimeSlot model
const BookingService = require('./BookingService'); // Import BookingService model (for associated bookings)

const BookingLocal = sequelize.define('BookingLocal', {
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
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'booking_locals',
  timestamps: false,
});

User.hasMany(BookingLocal, { foreignKey: 'client_id', onDelete: 'CASCADE' });
BookingLocal.belongsTo(User, { foreignKey: 'client_id' });

TimeSlot.hasOne(BookingLocal, { foreignKey: 'time_slot_id', onDelete: 'CASCADE' });
BookingLocal.belongsTo(TimeSlot, { foreignKey: 'time_slot_id' });

BookingLocal.hasMany(BookingService, { foreignKey: 'booking_local_id', as: 'associated_services' });

module.exports = BookingLocal;
