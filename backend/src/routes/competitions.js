const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const competitions = new Map();

router.get('/', (req, res) => {
  try {
    const compList = Array.from(competitions.values());
    res.json(compList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch competitions' });
  }
});

router.post('/', authenticate, (req, res) => {
  try {
    const { name, startDate, endDate, location } = req.body;
    const compId = Date.now().toString();
    const competition = {
      id: compId,
      name,
      startDate,
      endDate,
      location,
      createdBy: req.user.userId,
      createdAt: new Date()
    };
    competitions.set(compId, competition);
    res.status(201).json(competition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create competition' });
  }
});

module.exports = router;
