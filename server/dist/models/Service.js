"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Service extends sequelize_1.Model {
    // Custom validation method
    hasWorkerOrLocal() {
        if (!this.worker_id && !this.local_id) {
            throw new Error('A service must be associated with either a worker or a local.');
        }
    }
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    worker_id: {
        type: sequelize_1.DataTypes.UUID, //FK WorkerProfile
        allowNull: true,
    },
    local_id: {
        type: sequelize_1.DataTypes.UUID, //FK Local
        allowNull: true,
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
        allowNull: true,
        validate: {
            min: 0,
        },
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'services',
    timestamps: false,
    validate: {
        hasWorkerOrLocal() {
            if (!this.worker_id && !this.local_id) {
                throw new Error('A service must be associated with either a worker or a local.');
            }
        },
    },
});
exports.default = Service;
