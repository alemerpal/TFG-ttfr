"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class TimeSlot extends sequelize_1.Model {
}
TimeSlot.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    item_id: {
        type: sequelize_1.DataTypes.UUID, //FK Local or Service
        allowNull: false,
    },
    item_id_type: {
        type: sequelize_1.DataTypes.ENUM('Local', 'Service'),
        allowNull: false,
    },
    filled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    start_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    end_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    recurring_rule: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'time_slots',
    timestamps: false,
});
exports.default = TimeSlot;
