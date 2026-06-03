# 🥋 DojoControl - IJF Compliant Judo Tournament Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791)](https://www.postgresql.org/)
[![IJF Compliant](https://img.shields.io/badge/IJF%20Compliant-2024--2025-gold)](https://www.ijf.org/)

---

## 📖 Overview

**DojoControl** is a professional-grade tournament management system for judo competitions, fully compliant with **IJF (International Judo Federation)** regulations 2024-2025.

### ✨ Key Features

- ✅ **IJF-Compliant Scoring**: Ippon, Waza-ari, Yuko, Shido system
- ✅ **Weight Categories**: Official IJF weight divisions (Senior, Cadet, Junior)
- ✅ **Tournament Workflows**: Registration → Weigh-in → Draw → Matches → Results
- ✅ **Real-time Scoreboard**: Live match updates with public display
- ✅ **Match Management**: Automatic bracket generation, advancement, consolation
- ✅ **Admin Dashboard**: Full tournament oversight & configuration
- ✅ **Multi-user Support**: Clubs, Referees, Organizers, Spectators
- ✅ **REST API**: Complete API for integrations
- ✅ **Docker Ready**: Production deployment out of the box
- ✅ **Secure**: JWT auth, role-based access control, data validation

---

## 🏗️ Architecture

```
DojoControl/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Database, JWT, environment
│   │   ├── controllers/        # Route handlers
│   │   ├── models/            # Database schemas
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth, validation
│   │   ├── services/          # Business logic (IJF rules)
│   │   ├── utils/             # Helpers & utilities
│   │   └── constants/         # IJF data & configurations
│   ├── tests/                 # Unit & integration tests
│   └── docker/               # Docker configuration
│
├── frontend/                  # React + Vite SPA
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Route pages
│   │   ├── services/         # API client
│   │   ├── hooks/            # Custom React hooks
│   │   ├── styles/           # Tailwind CSS
│   │   ├── constants/        # Client-side constants
│   │   └── utils/            # Client utilities
│   └── public/               # Static assets
│
├── docs/                      # Documentation
│   ├── API.md                # API reference
│   ├── IJF_RULES.md          # Implemented rules
│   ├── ARCHITECTURE.md       # Technical architecture
│   ├── SETUP.md              # Installation guide
│   └── DEPLOYMENT.md         # Production deployment
│
└── .github/workflows/        # CI/CD pipelines
    ├── tests.yml             # Automated testing
    └── deploy.yml            # Production deployment
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Development Setup

#### 1. Clone & Install
```bash
git clone https://github.com/DaddyChocolat/DojoControl.git
cd DojoControl

# Backend
cd backend
npm install
cp .env.example .env

# Frontend
cd ../frontend
npm install
cp .env.example .env
```

#### 2. Start with Docker
```bash
docker-compose up -d
```

#### 3. Run Locally
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Backend: `http://localhost:5000`
Frontend: `http://localhost:5173`

---

## 📚 Documentation

- **[API Documentation](./docs/API.md)** - Complete API reference
- **[IJF Rules Implementation](./docs/IJF_RULES.md)** - Detailed rule compliance
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - Technical deep dive
- **[Setup Guide](./docs/SETUP.md)** - Installation & configuration
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment

---

## 🏛️ IJF Compliance

### Scoring System (2024-2025)
- **Ippon** (一本): Perfect technique, 20+ second pin, or submission = Victory
- **Waza-ari** (技あり): Partial technique, 10-19 second pin = Half point (2 = 1 ippon)
- **Yuko** (有効): Recently reintroduced for less substantial techniques
- **Shido** (指導): Penalty for passivity/infractions (3 = Disqualification)

### Weight Categories (Senior)
**Men:** -60kg, -66kg, -73kg, -81kg, -90kg, -100kg, +100kg
**Women:** -48kg, -52kg, -57kg, -63kg, -70kg, -78kg, +78kg

### Time Limits (Regulation Time)
- **Minimes (12-13):** 2 minutes
- **Cadets (15-17):** 3 minutes
- **Juniors (18-20):** 3 minutes
- **Seniors:** 4 minutes

### Age Divisions
- **U18 (Cadet):** 15-17 years
- **U21 (Junior):** 18-20 years
- **Seniors:** 21+ years
- **Veterans (Masters):** 30+ years (5-year increments)

---

## 🔒 Security

- **JWT Authentication** with refresh tokens
- **Role-Based Access Control (RBAC)**
- **Password hashing** (bcrypt)
- **CORS protection**
- **Input validation** & sanitization
- **SQL injection** prevention (ORM)
- **Rate limiting** on sensitive endpoints

---

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register        - Register new account
POST   /api/auth/login           - Login user
POST   /api/auth/refresh         - Refresh JWT token
POST   /api/auth/logout          - Logout user
```

### Competitions
```
GET    /api/competitions         - List all competitions
POST   /api/competitions         - Create new competition
GET    /api/competitions/:id     - Get competition details
PUT    /api/competitions/:id     - Update competition
DELETE /api/competitions/:id     - Delete competition
```

### Clubs & Athletes
```
GET    /api/clubs                - List all clubs
POST   /api/clubs                - Register new club
GET    /api/clubs/:id/athletes   - Get club athletes
POST   /api/athletes             - Register athlete
GET    /api/athletes/:id         - Get athlete details
```

### Matches & Scoring
```
GET    /api/competitions/:id/matches     - Get matches
POST   /api/matches/:id/score            - Record match score
GET    /api/matches/:id/live             - Get live match data
```

### Results
```
GET    /api/competitions/:id/results     - Get final results
GET    /api/competitions/:id/rankings    - Get category rankings
```

See [API Documentation](./docs/API.md) for complete reference.

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📦 Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 15+
- **ORM**: Sequelize
- **Authentication**: JWT + bcrypt
- **Validation**: Joi
- **Testing**: Jest, Supertest

### Frontend
- **Library**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State**: Redux Toolkit / Context API
- **Forms**: React Hook Form
- **UI Components**: Headless UI

### DevOps
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: (Ready for integration)

---

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](./LICENSE) file.

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/DaddyChocolat/DojoControl/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DaddyChocolat/DojoControl/discussions)
- **Email**: contact@dojocontrol.local

---

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core tournament management
- ✅ IJF rules implementation
- ✅ Basic API & UI

### Phase 2
- 🔄 Advanced statistics & analytics
- 🔄 Video integration
- 🔄 Mobile app (React Native)

### Phase 3
- 🔄 AI-powered predictions
- 🔄 International federation integration
- 🔄 Multi-language support

---

**Last Updated**: June 2026
**Version**: 2.0.0-beta
**Status**: 🟢 Active Development