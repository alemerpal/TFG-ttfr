const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const WorkerProfile = require('./WorkerProfile'); // Import WorkerProfile model
const TimeSlot = require('./TimeSlot'); // Import TimeSlot model

const Local = sequelize.define('Local', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  worker_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: WorkerProfile,
      key: 'id',
    },
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
    type: DataTypes.DECIMAL(10, 8), // Latitude can have up to 8 decimal places
    allowNull: true, // Can be null if address_text is sufficient
  },
  location_lng: {
    type: DataTypes.DECIMAL(11, 8), // Longitude can have up to 8 decimal places
    allowNull: true, // Can be null if address_text is sufficient
  },
  address_text: {
    type: DataTypes.STRING,
    allowNull: true, // Can be null if lat/lng is sufficient
  },
}, {
  tableName: 'locals',
  timestamps: false, // Set to true for consistency
});

WorkerProfile.hasMany(Local, { foreignKey: 'worker_id', onDelete: 'CASCADE' });
Local.belongsTo(WorkerProfile, { foreignKey: 'worker_id' });

Local.hasMany(TimeSlot, {
  foreignKey: 'item_id',
  constraints: false,
  scope: {
    item_id_type: 'Local',
  },
});
TimeSlot.belongsTo(Local, { foreignKey: 'item_id', constraints: false });

module.exports = Local;