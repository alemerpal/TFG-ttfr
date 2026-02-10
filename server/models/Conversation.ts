import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface ConversationAttributes {
  id?: string;
  user_1_id: string;
  user_2_id: string;
}

class Conversation extends Model<ConversationAttributes> implements ConversationAttributes {
  public id!: string;
  public user_1_id!: string;
  public user_2_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Custom validation method
  public usersAreDifferent(): void {
    if (this.user_1_id === this.user_2_id) {
      throw new Error('A conversation cannot be between the same user.');
    }
  }
}

Conversation.init({
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
  sequelize,
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

export default Conversation;