"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV || 'development';
let sequelize;
if (NODE_ENV === 'production') {
    exports.sequelize = sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mariadb',
        logging: false, // Set to true to see SQL queries in console
    });
}
else {
    exports.sequelize = sequelize = new sequelize_1.Sequelize({
        dialect: 'sqlite',
        storage: process.env.SQLITE_STORAGE || './database.sqlite',
        logging: false, // Set to true to see SQL queries in console
    });
}
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        // await sequelize.sync({ alter: true }); // Use { force: true } to drop and re-create tables
        // console.log('All models were synchronized successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process if database connection fails
    }
});
exports.connectDB = connectDB;
