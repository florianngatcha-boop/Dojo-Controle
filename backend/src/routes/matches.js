const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const matches = new Map();

router.get('/category/:categoryId', (req, res) => {
  try {
    const categoryMatches = Array.from(matches.values())
      .filter(m => m.categoryId === req.params.categoryId);
    res.json(categoryMatches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

router.post('/', authenticate, (req, res) => {
  try {
    const { categoryId, athlete1Id, athlete2Id, round, matchNum } = req.body;
    
    const matchId = `match_${categoryId}_R${round}_M${matchNum}`;
    const match = {
      id: matchId,
      categoryId,
      athlete1Id,
      athlete2Id,
      round,
      matchNum,
      score1: null,
      score2: null,
      winnerId: null,
      status: 'pending',
      createdAt: new Date()
    };

    matches.set(matchId, match);
    res.status(201).json(match);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create match' });
  }
});

router.put('/:matchId/score', authenticate, (req, res) => {
  try {
    const match = matches.get(req.params.matchId);
    if (!match) return res.status(404).json({ error: 'Match not found' });

    const { score1, score2, winnerId } = req.body;
    match.score1 = score1;
    match.score2 = score2;
    match.winnerId = winnerId;
    match.status = 'completed';
    match.updatedAt = new Date();
    
    matches.set(req.params.matchId, match);
    res.json({ message: 'Match updated', match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update match' });
  }
});

module.exports = router;
