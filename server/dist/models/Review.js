"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Review extends sequelize_1.Model {
}
Review.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    booking_id: {
        type: sequelize_1.DataTypes.UUID, //FK Booking
        allowNull: false,
    },
    booking_type: {
        type: sequelize_1.DataTypes.ENUM('BookingLocal', 'BookingService'),
        allowNull: false,
    },
    reviewer_id: {
        type: sequelize_1.DataTypes.UUID, //FK Review
        allowNull: false,
    },
    worker_id: {
        type: sequelize_1.DataTypes.UUID, //FK WorkerProfile
        allowNull: true,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'reviews',
    timestamps: false,
});
exports.default = Review;
