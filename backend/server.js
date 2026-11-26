// Load environment variables before other modules.
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Allow the API to receive JSON data.
app.use(express.json());
app.use('/api/profile', profileRoutes);

// Basic test route.
app.get('/', (req, res) => {
  res.json({ message: 'CommunityHub Profile API is running' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();