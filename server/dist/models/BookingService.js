"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class BookingService extends sequelize_1.Model {
}
BookingService.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    client_id: {
        type: sequelize_1.DataTypes.UUID, //FK User
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'PENDING',
    },
    total_price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0,
        },
    },
    time_slot_id: {
        type: sequelize_1.DataTypes.UUID, //FK TimeSlot
        allowNull: false,
    },
    booking_local_id: {
        type: sequelize_1.DataTypes.UUID, //FK BookingLocal
        allowNull: true,
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'booking_services',
    timestamps: false,
});
exports.default = BookingService;
