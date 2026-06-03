module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`📡 Client connected: ${socket.id}`);

    socket.on('join_match', (matchId) => {
      socket.join(`match_${matchId}`);
      console.log(`✅ joined match ${matchId}`);
    });

    socket.on('update_score', (data) => {
      io.to(`match_${data.matchId}`).emit('score_updated', data);
    });

    socket.on('update_chrono', (data) => {
      io.to(`match_${data.matchId}`).emit('chrono_updated', data);
    });

    socket.on('update_weight', (data) => {
      io.emit('weight_recorded', data);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
  });
};
