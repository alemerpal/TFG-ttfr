const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User'); // Import User model

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  // Ensure ids are different at application level
  user_1_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  user_2_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  tableName: 'conversations',
  timestamps: false,
});

User.belongsToMany(User, {
  through: Conversation,
  as: 'User1Conversations',
  foreignKey: 'user_1_id',
});
User.belongsToMany(User, {
  through: Conversation,
  as: 'User2Conversations',
  foreignKey: 'user_2_id',
});

Conversation.belongsTo(User, { foreignKey: 'user_1_id', as: 'User1' });
Conversation.belongsTo(User, { foreignKey: 'user_2_id', as: 'User2' });

module.exports = Conversation;
