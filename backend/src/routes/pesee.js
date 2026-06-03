const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const athletes = new Map();

router.post('/:athleteId/weight', authenticate, (req, res) => {
  try {
    const { athleteId } = req.params;
    const { weight } = req.body;

    const athlete = athletes.get(athleteId);
    if (!athlete) {
      return res.status(404).json({ error: 'Athlete not found' });
    }

    athlete.weighInWeight = weight;
    athlete.weighInDate = new Date();
    athlete.approvedForTournament = true;

    res.json({ message: 'Weight recorded', athlete });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record weight' });
  }
});

router.get('/status/:athleteId', (req, res) => {
  const athlete = athletes.get(req.params.athleteId);
  if (!athlete) return res.status(404).json({ error: 'Athlete not found' });
  
  res.json({
    athleteId: athlete.id,
    weight: athlete.weighInWeight,
    date: athlete.weighInDate,
    approved: athlete.approvedForTournament
  });
});

module.exports = router;
