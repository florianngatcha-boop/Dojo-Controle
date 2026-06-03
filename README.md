# DojoControl - IJF Compliant Judo Tournament Management System

## Architecture Refactor v2.0 🚀

Complète refonte du système de gestion de tournois de judo avec :

### Backend (Express.js + Node.js)
- ✅ API REST complète avec JWT authentication
- ✅ WebSocket pour synchronisation temps réel
- ✅ Règles IJF intégrées (poids, scoring, temps)
- ✅ Architecture modulaire (routes, controllers, services)

### Frontend (HTML5 + Axios + Socket.io)
- ✅ Pages modernes avec communication API
- ✅ Real-time sync via WebSocket
- ✅ Inscription clubs & athlètes
- ✅ Pesée officielle (Balance)
- ✅ Table de marque IJF
- ✅ Tableaux de compétition

## Installation & Démarrage

### Avec Docker Compose (Recommandé)
```bash
docker-compose up -d
```

Accès :
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api/v1
- PostgreSQL: localhost:5432

### Manuel

#### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Routes

### Auth
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/verify` - Verify token

### Clubs
- `GET /api/v1/clubs` - List clubs
- `POST /api/v1/clubs` - Create club

### Athletes
- `GET /api/v1/athletes` - List athletes
- `POST /api/v1/athletes` - Register athlete
- `PUT /api/v1/athletes/:id` - Update athlete

### Weigh-in
- `POST /api/v1/pesee/:athleteId/weight` - Record weight

### Matches
- `GET /api/v1/matches/category/:categoryId` - Get matches
- `POST /api/v1/matches` - Create match
- `PUT /api/v1/matches/:matchId/score` - Update score

## Prochaines Étapes

1. **PostgreSQL Integration** - Remplacer Maps en-mémoire par Sequelize ORM
2. **Admin Panel** - Dashboard complète
3. **PDF Reports** - Génération rapports finaux
4. **Mobile App** - React Native
5. **Production Deploy** - AWS/Heroku
