const express = require('express');
const router = express.Router();
const db = require('../db');

// Create booking
router.post('/', (req, res) => {
  const { name, room_type } = req.body;
  db.query('INSERT INTO bookings (name, room_type) VALUES (?, ?)', [name, room_type], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking created' });
  });
});

// Read all bookings
router.get('/', (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Update booking
router.put('/:id', (req, res) => {
  const { name, room_type } = req.body;
  db.query('UPDATE bookings SET name = ?, room_type = ? WHERE id = ?', [name, room_type, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking updated' });
  });
});

// Delete booking
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM bookings WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Booking deleted' });
  });
});

module.exports = router;
