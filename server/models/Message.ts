import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface MessageAttributes {
  id?: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at?: Date;
  sent_at: Date;
}

class Message extends Model<MessageAttributes> implements MessageAttributes {
  public id!: string;
  public conversation_id!: string;
  public sender_id!: string;
  public content!: string;
  public read_at?: Date;
  public sent_at!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  conversation_id: {
    type: DataTypes.UUID, //FK Conversation
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.UUID, //FK User
    allowNull: false,
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
  sequelize,
  tableName: 'messages',
  timestamps: false,
});

export default Message;
