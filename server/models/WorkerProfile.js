const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const WorkerProfile = sequelize.define('WorkerProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID, //FK User
    allowNull: false,
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'worker_profiles',
  timestamps: false,
});

module.exports = WorkerProfile;