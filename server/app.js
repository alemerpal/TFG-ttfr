const express = require('express');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/database');

// Import routes
const localRoutes = require('./routes/localRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes'); // New
const workerProfileRoutes = require('./routes/workerProfileRoutes'); // New

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
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
    process.exit(1);
  }
}

initializeDatabase();

app.use(express.json()); // For parsing application/json

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/locals', localRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/worker-profiles', workerProfileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Export app for testing
module.exports = app;