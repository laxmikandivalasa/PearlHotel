const express = require('express');
const router = express.Router();
const db = require('../db');

// Register user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('Received:', { username, password }); // ✅ Add this to verify input
  
    db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, password],
      (err) => {
        if (err) {
          console.error('Registration Error:', err); // ✅ Required
          return res.status(500).json({ error: err });
        }
        res.json({ message: 'User registered' });
      }
    );
  });
  

// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) res.json({ message: 'Login success' });
    else res.status(401).json({ error: 'Invalid credentials' });
  });
});


module.exports = router;
