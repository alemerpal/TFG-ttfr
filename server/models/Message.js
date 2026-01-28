const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Conversation = require('./Conversation'); // Import Conversation model
const User = require('./User'); // Import User model

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  conversation_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Conversation,
      key: 'id',
    },
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'messages',
  timestamps: false,
});

Conversation.hasMany(Message, { foreignKey: 'conversation_id', onDelete: 'CASCADE' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });

User.hasMany(Message, { foreignKey: 'sender_id', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

module.exports = Message;