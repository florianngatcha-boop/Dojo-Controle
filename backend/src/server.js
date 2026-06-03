require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const http = require('http');
const { Server: SocketIO } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    credentials: true
  }
});

// === MIDDLEWARE ===
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// === HEALTH CHECK ===
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// === API ROUTES ===
const apiPrefix = '/api/v1';
app.use(`${apiPrefix}/auth`, require('./routes/auth'));
app.use(`${apiPrefix}/clubs`, require('./routes/clubs'));
app.use(`${apiPrefix}/athletes`, require('./routes/athletes'));
app.use(`${apiPrefix}/competitions`, require('./routes/competitions'));
app.use(`${apiPrefix}/matches`, require('./routes/matches'));
app.use(`${apiPrefix}/pesee`, require('./routes/pesee'));

// === WEBSOCKET ===
require('./config/websocket')(io);

// === ERROR HANDLING ===
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// === 404 ===
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// === START SERVER ===
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n✅ DojoControl Backend running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket enabled`);
  console.log(`\n`);
});

module.exports = { app, server, io };
