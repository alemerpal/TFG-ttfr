"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Conversation extends sequelize_1.Model {
    // Custom validation method
    usersAreDifferent() {
        if (this.user_1_id === this.user_2_id) {
            throw new Error('A conversation cannot be between the same user.');
        }
    }
}
Conversation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    user_1_id: {
        type: sequelize_1.DataTypes.UUID, //FK User
        allowNull: false,
    },
    user_2_id: {
        type: sequelize_1.DataTypes.UUID, //FK User
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
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
exports.default = Conversation;
