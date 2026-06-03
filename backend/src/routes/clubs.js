const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const clubs = new Map();

router.get('/', (req, res) => {
  try {
    const clubList = Array.from(clubs.values());
    res.json(clubList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

router.post('/', authenticate, (req, res) => {
  try {
    const { name, abbreviation, manager, city, email, phone, logoBase64 } = req.body;
    
    const existing = Array.from(clubs.values()).find(c => c.abbreviation === abbreviation);
    if (existing) {
      return res.status(409).json({ error: 'Club with this abbreviation already exists' });
    }

    const clubId = Date.now().toString();
    const club = {
      id: clubId,
      name,
      abbreviation: (abbreviation || '').toUpperCase(),
      manager,
      city,
      email,
      phone,
      logo: logoBase64,
      createdBy: req.user.userId,
      createdAt: new Date()
    };

    clubs.set(clubId, club);
    res.status(201).json(club);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create club' });
  }
});

router.get('/:clubId', (req, res) => {
  const club = clubs.get(req.params.clubId);
  if (!club) return res.status(404).json({ error: 'Club not found' });
  res.json(club);
});

module.exports = router;
