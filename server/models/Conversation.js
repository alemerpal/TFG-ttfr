const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_1_id: {
    type: DataTypes.UUID, //FK User
    allowNull: false,
  },
  user_2_id: {
    type: DataTypes.UUID, //FK User
    allowNull: false,
  },
}, {
  tableName: 'conversations',
  timestamps: false,
  validate: {
    usersAreDifferent() {
      if (this.user_1_id === this.user_2_id) {
        throw new Error('A conversation cannot be between the same user.');
      }
    },
  },
});

module.exports = Conversation;