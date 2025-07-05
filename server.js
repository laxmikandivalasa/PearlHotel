const express = require('express');
const app = express();
const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

// Routes
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);
// Default route (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
