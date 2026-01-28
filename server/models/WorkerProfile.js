const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // Import User model

const WorkerProfile = sequelize.define('WorkerProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
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
    allowNull: true, // Optional
  },
}, {
  tableName: 'worker_profiles',
  timestamps: false,
});

User.hasOne(WorkerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
WorkerProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = WorkerProfile;
