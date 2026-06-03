# DojoControl Backend API

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## API Routes

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/verify` - Verify JWT token

### Clubs
- `GET /api/v1/clubs` - List all clubs
- `POST /api/v1/clubs` - Create new club (requires auth)
- `GET /api/v1/clubs/:clubId` - Get club details

### Athletes
- `GET /api/v1/athletes` - List athletes (with filters)
- `POST /api/v1/athletes` - Register athlete (requires auth)
- `PUT /api/v1/athletes/:athleteId` - Update athlete

### Weigh-in (Pesée)
- `POST /api/v1/pesee/:athleteId/weight` - Record weight
- `GET /api/v1/pesee/status/:athleteId` - Get weigh-in status

### Matches
- `GET /api/v1/matches/category/:categoryId` - Get matches for category
- `POST /api/v1/matches` - Create match (requires auth)
- `PUT /api/v1/matches/:matchId/score` - Update match score

### Competitions
- `GET /api/v1/competitions` - List competitions
- `POST /api/v1/competitions` - Create competition (requires auth)

## WebSocket Events

- `join_match` - Join match room
- `update_score` - Update score in real-time
- `update_chrono` - Update timer
- `update_weight` - Record weight
