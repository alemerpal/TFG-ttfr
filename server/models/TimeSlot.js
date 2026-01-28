const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Local = require('./Local'); // Import Local model
const Service = require('./Service'); // Import Service model

const TimeSlot = sequelize.define('TimeSlot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.UUID, //Polymorphic of Local or Service
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
    type: DataTypes.STRING, // e.g., using iCalendar RRULE format or similar
    allowNull: true,
  },
}, {
  tableName: 'time_slots',
  timestamps: true,
});

Local.hasMany(TimeSlot, {
  foreignKey: 'item_id',
  constraints: false, // disable constraints for polymorphic
  scope: {
    item_id_type: 'Local',
  },
});
Service.hasMany(TimeSlot, {
  foreignKey: 'item_id',
  constraints: false,
  scope: {
    item_id_type: 'Service',
  },
});

TimeSlot.belongsTo(Local, { foreignKey: 'item_id', constraints: false });
TimeSlot.belongsTo(Service, { foreignKey: 'item_id', constraints: false });

module.exports = TimeSlot;