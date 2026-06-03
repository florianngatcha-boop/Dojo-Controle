const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const athletes = new Map();

router.get('/', (req, res) => {
  try {
    const { clubId, approved } = req.query;
    let athleteList = Array.from(athletes.values());
    
    if (clubId) athleteList = athleteList.filter(a => a.clubId === clubId);
    if (approved !== undefined) athleteList = athleteList.filter(a => a.approvedForTournament === (approved === 'true'));

    res.json(athleteList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch athletes' });
  }
});

router.post('/', authenticate, (req, res) => {
  try {
    const { clubId, firstName, lastName, gender, dateOfBirth, categoryTarget, grade } = req.body;
    
    const athleteId = Date.now().toString();
    const athlete = {
      id: athleteId,
      clubId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      categoryTarget,
      grade,
      approvedForTournament: false,
      weighInWeight: null,
      weighInDate: null,
      finalCategory: null,
      createdAt: new Date()
    };

    athletes.set(athleteId, athlete);
    res.status(201).json(athlete);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create athlete' });
  }
});

router.put('/:athleteId', authenticate, (req, res) => {
  try {
    const athlete = athletes.get(req.params.athleteId);
    if (!athlete) return res.status(404).json({ error: 'Athlete not found' });

    Object.assign(athlete, req.body);
    athlete.updatedAt = new Date();
    athletes.set(req.params.athleteId, athlete);
    
    res.json(athlete);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update athlete' });
  }
});

module.exports = router;
