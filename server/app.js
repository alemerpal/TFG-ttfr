const express = require('express');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import models to ensure they are registered with Sequelize
require('./models/User');
require('./models/WorkerProfile');
require('./models/Local');
require('./models/Service');
require('./models/TimeSlot');
require('./models/BookingLocal');
require('./models/BookingService');
require('./models/Review');
require('./models/Conversation');
require('./models/Message');

// Test database connection and synchronize models
async function initializeDatabase() {
  await connectDB();
  try {
    // await sequelize.sync({ force: true }); // Use { force: true } to drop and re-create tables (use with caution!)
    await sequelize.sync({ alter: true }); // This checks what is the current state of the table in the database (which columns it has, what their types are, etc), and then performs the necessary changes in the table to make it match the model.
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
    process.exit(1);
  }
}

initializeDatabase();

// Middleware
app.use(express.json()); // For parsing application/json

// Basic "Hello World" API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Export app for testing or further module use
module.exports = app;