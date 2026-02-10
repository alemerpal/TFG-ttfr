"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Local extends sequelize_1.Model {
}
Local.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    worker_id: {
        type: sequelize_1.DataTypes.UUID, //FK WorkerProfile
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    base_price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0,
        },
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    location_lat: {
        type: sequelize_1.DataTypes.DECIMAL(10, 8),
        allowNull: true,
    },
    location_lng: {
        type: sequelize_1.DataTypes.DECIMAL(11, 8),
        allowNull: true,
    },
    address_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'locals',
    timestamps: false,
});
exports.default = Local;
