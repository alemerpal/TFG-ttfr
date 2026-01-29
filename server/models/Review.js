const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Review = sequelize.define('Review', {
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
  tableName: 'reviews',
  timestamps: false,
});

module.exports = Review;