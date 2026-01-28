const { Sequelize } = require('sequelize');
require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'development';

let sequelize;

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mariadb',
      logging: false, // Set to true to see SQL queries in console
    }
  );
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SQLITE_STORAGE || './database.sqlite',
    logging: false, // Set to true to see SQL queries in console
  });
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    // await sequelize.sync({ alter: true }); // Use { force: true } to drop and re-create tables
    // console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process if database connection fails
  }
};

module.exports = { sequelize, connectDB };
