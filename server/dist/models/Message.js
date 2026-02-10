"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    conversation_id: {
        type: sequelize_1.DataTypes.UUID, //FK Conversation
        allowNull: false,
    },
    sender_id: {
        type: sequelize_1.DataTypes.UUID, //FK User
        allowNull: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    read_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    sent_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'messages',
    timestamps: false,
});
exports.default = Message;
