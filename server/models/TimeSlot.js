const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TimeSlot = sequelize.define('TimeSlot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  item_id: { //Polymorphic FK
    type: DataTypes.UUID, //FK Local or Service
    allowNull: false,
  },
  item_id_type: {
    type: DataTypes.ENUM('Local', 'Service'),
    allowNull: false,
  },
  filled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  start_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  recurring_rule: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'time_slots',
  timestamps: false,
});

module.exports = TimeSlot;
