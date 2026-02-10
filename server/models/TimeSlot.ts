import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

interface TimeSlotAttributes {
  id?: string;
  item_id: string;
  item_id_type: 'Local' | 'Service';
  filled: boolean;
  start_datetime: Date;
  end_datetime: Date;
  recurring_rule?: string;
}

class TimeSlot extends Model<TimeSlotAttributes> implements TimeSlotAttributes {
  public id!: string;
  public item_id!: string;
  public item_id_type!: 'Local' | 'Service';
  public filled!: boolean;
  public start_datetime!: Date;
  public end_datetime!: Date;
  public recurring_rule?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TimeSlot.init({
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
  sequelize,
  tableName: 'time_slots',
  timestamps: false,
});

export default TimeSlot;
