const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const WorkerProfile = require('./WorkerProfile'); // Import WorkerProfile model
const Local = require('./Local'); // Import Local model
const TimeSlot = require('./TimeSlot'); // Import TimeSlot model

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  worker_id: {
    type: DataTypes.UUID,
    allowNull: true, // Optional
    references: {
      model: WorkerProfile,
      key: 'id',
    },
  },
  local_id: {
    type: DataTypes.UUID,
    allowNull: true, // Optional
    references: {
      model: Local,
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
    allowNull: true,
    validate: {
      min: 0,
    },
  },
}, {
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

WorkerProfile.hasMany(Service, { foreignKey: 'worker_id', onDelete: 'CASCADE' });
Service.belongsTo(WorkerProfile, { foreignKey: 'worker_id' });

Local.hasMany(Service, { foreignKey: 'local_id', onDelete: 'CASCADE' });
Service.belongsTo(Local, { foreignKey: 'local_id' });

Service.hasMany(TimeSlot, {
  foreignKey: 'item_id',
  constraints: false,
  scope: {
    item_id_type: 'Service',
  },
});
TimeSlot.belongsTo(Service, { foreignKey: 'item_id', constraints: false });

module.exports = Service;