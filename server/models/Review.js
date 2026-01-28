const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // Import User model
const BookingLocal = require('./BookingLocal'); // Import BookingLocal model
const BookingService = require('./BookingService'); // Import BookingService model

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  booking_id: { // Polymorphic FK
    type: DataTypes.UUID,
    allowNull: false,
  },
  booking_type: { // 'BookingLocal' or 'BookingService'
    type: DataTypes.ENUM('BookingLocal', 'BookingService'),
    allowNull: false,
  },
  reviewer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  worker_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id',
    },
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

User.hasMany(Review, { foreignKey: 'reviewer_id', onDelete: 'CASCADE', as: 'WrittenReviews' });
Review.belongsTo(User, { foreignKey: 'reviewer_id', as: 'Reviewer' });

User.hasMany(Review, { foreignKey: 'worker_id', onDelete: 'SET NULL', as: 'ReceivedReviews' }); // If worker is deleted, set worker_id to NULL
Review.belongsTo(User, { foreignKey: 'worker_id', as: 'WorkerReviewed' });

BookingLocal.hasMany(Review, {
  foreignKey: 'booking_id',
  constraints: false,
  scope: {
    booking_type: 'BookingLocal',
  },
});
BookingService.hasMany(Review, {
  foreignKey: 'booking_id',
  constraints: false,
  scope: {
    booking_type: 'BookingService',
  },
});

Review.belongsTo(BookingLocal, { foreignKey: 'booking_id', constraints: false });
Review.belongsTo(BookingService, { foreignKey: 'booking_id', constraints: false });

module.exports = Review;
